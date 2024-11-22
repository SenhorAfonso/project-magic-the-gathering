import { Inject, Injectable } from '@nestjs/common';
import { DeckBaseUseCase } from './deck-base.usecase';
import { Readable } from 'stream';
import * as JSONStream from 'JSONStream';
import { DecksRepository } from '@/infraestructure/repositories/decks.repository';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { KafkaService } from '@/infraestructure/kafka/kafka-service';

@Injectable()
export class ImportDeckUseCase extends DeckBaseUseCase {
  constructor(
    protected readonly decksRepository: DecksRepository,
    protected readonly configService: ConfigService,
    protected readonly kafkaProducer: KafkaService,
    @Inject(CACHE_MANAGER) protected cacheManager: Cache,
  ) {
    super(decksRepository, configService, cacheManager);
  }
  async execute(fileBuffer: Buffer) {
    const deck = await this.processDeckFile(fileBuffer);

    await this.kafkaProducer.send('deck_import_queue', {
      value: JSON.stringify(deck),
    });

    console.log('kafka message', deck);
  }

  private async processDeckFile(fileBuffer: Buffer) {
    const stream = Readable.from(fileBuffer.toString('utf-8'));
    const parser = JSONStream.parse('*');

    return new Promise((resolve, reject) => {
      const deck = { commander: null, cards: [] };

      stream
        .pipe(parser)
        .on('data', (data) => {
          deck.commander = data[0].name;

          return deck.cards.push(data);
        })
        .on('end', () => {
          resolve(deck);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}
