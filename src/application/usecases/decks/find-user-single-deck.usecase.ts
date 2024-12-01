import { Injectable } from '@nestjs/common';
import { DeckBaseUseCase } from './deck-base.usecase';
import { Card } from '@/infraestructure/schemas/card.schema';

@Injectable()
export class FetchUserSingleDeck extends DeckBaseUseCase {
  async execute(deckId: string) {
    const cachedUserDecks: Card[] = await this.cacheManager.get(deckId);

    if (cachedUserDecks) {
      return {
        deck: cachedUserDecks,
      };
    } else {
      const fetchedUserDeck = await this.decksRepository.findDeckById(deckId);
      await this.cacheManager.set(deckId, fetchedUserDeck);
      return {
        deck: fetchedUserDeck,
      };
    }
  }
}
