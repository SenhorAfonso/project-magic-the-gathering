import { Inject, Injectable } from '@nestjs/common';
import { DeckBaseUseCase } from './deck-base.usecase';
import { Readable } from 'stream';
import * as JSONStream from 'JSONStream';
import { WsCreateDeckUseCase } from '../websocket/ws-create-deck.usecase';
import { WsUpdateDeckUseCase } from '../websocket/ws-update-deck.usecase';
import { ConfigService } from '@nestjs/config';
import { KafkaProduceMessageUseCase } from '@/application/usecases/kafka/kafka-producer.usecase';
import { GetUserByIdUseCase } from '../users/get-user-by-id.usecase';
import { DecksRepository } from '@/infraestructure/repositories/decks.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ImportDeckUseCase extends DeckBaseUseCase {
  constructor(
    private readonly websocketUpdate: WsUpdateDeckUseCase,
    private readonly websocketCreate: WsCreateDeckUseCase,
    @Inject(DecksRepository) decksRepository: DecksRepository,
    @Inject(ConfigService) configService: ConfigService,
    @Inject(KafkaProduceMessageUseCase) kafkaP: KafkaProduceMessageUseCase,
    @Inject(GetUserByIdUseCase) getUserById: GetUserByIdUseCase,
    @Inject(CACHE_MANAGER) cacheManager: Cache,
  ) {
    super(decksRepository, configService, kafkaP, getUserById, cacheManager);
  }
  async execute(fileBuffer: Buffer) {
    const deck = await this.processDeckFile(fileBuffer);

    await this.kafkaProduceMessage.execute('deck_import_queue', {
      value: JSON.stringify(deck),
    });
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
        .on('end', async () => {
          try {
            const existingDeck = await this.decksRepository.findByCommander(
              deck.commander,
            );
            if (existingDeck) {
              this.websocketCreate.execute(deck);
            } else {
              this.websocketUpdate.execute(deck);
            }
            resolve(deck);
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}
