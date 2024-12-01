import { BadRequestException, Injectable } from '@nestjs/common';
import { DeckBaseUseCase } from './deck-base.usecase';
import { CardDto } from '@/application/dtos/cards/cards.dto';
@Injectable()
export class ValidateDeckUseCase extends DeckBaseUseCase {
  execute(data: any): { isValid: boolean } {
    const deck = data.cards[1];
    const commander = data.cards[1][0];

    this.validadeDeckSize(deck);
    this.validateCommander(commander);
    this.validateBasicLands(deck);
    this.validateColors(deck, commander);

    return { isValid: true };
  }

  private validadeDeckSize(deck: CardDto[]) {
    if (deck.length != 100) {
      throw new BadRequestException('Deck must have 100 cards');
    }
  }

  private validateCommander(commander: CardDto) {
    const isValidCommander = commander.type?.includes('Legendary Creature');

    if (!isValidCommander) {
      throw new BadRequestException('Deck must have a commander');
    }
  }

  private validateBasicLands(deck: CardDto[]) {
    const cards = deck.slice(1, 99);

    const isBasicLandOnly = cards.every((card) => {
      return card.type.includes('Basic Land');
    });

    if (!isBasicLandOnly) {
      throw new BadRequestException('Deck must have only basic lands');
    }
  }

  private validateColors(deck: CardDto[], commander: CardDto) {
    const commanderColors = commander.colorIdentity;

    const isCardColorValid = deck.every((card) => {
      const cardColors = card.colorIdentity;

      return cardColors.every((color) => commanderColors.includes(color));
    });

    if (!isCardColorValid) {
      throw new BadRequestException('Deck colors must match commander colors');
    }
  }
}
