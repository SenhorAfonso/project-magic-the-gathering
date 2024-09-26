import { Injectable } from '@nestjs/common';
import { DeckBaseUseCase } from './deck-base.usecase';
import { Readable } from 'stream';
import * as JSONStream from 'JSONStream';

@Injectable()
export class ImportDeckUseCase extends DeckBaseUseCase {
  async execute(fileBuffer: Buffer) {
    const stream = Readable.from(fileBuffer.toString('utf-8'));

    return new Promise((resolve, reject) => {
      const parser = JSONStream.parse('*');
      const deck = { commander: null, cards: [] };

      stream
        .pipe(parser)
        .on('data', (data) => {
          console.log(data.length);

          deck.commander = data[0].name;

          deck.cards.push(data);
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
