import { Injectable } from '@nestjs/common';
import { DeckBaseUseCase } from './deck-base.usecase';

@Injectable()
export class ValidateDeckUseCase extends DeckBaseUseCase {
  execute(data: any) {
    const commander = data.commander;
    const deck = data.cards

    // if (data.cards.length != 100) {
    //   throw new Error('Deck must have 100 cards');
    // }

    const commanderCard = deck.find((card) => card.type === 'legendary creature');
    console.log(commanderCard);
    
    
  }
}
