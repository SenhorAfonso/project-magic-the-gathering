import { Injectable } from '@nestjs/common';
import { DeckBaseUseCase } from './deck-base.usecase';
import { Readable } from 'stream';
import * as JSONStream from 'JSONStream';

@Injectable()
export class ImportDeckUseCase extends DeckBaseUseCase {
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
        .on('end', () => {
          resolve(deck);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}
