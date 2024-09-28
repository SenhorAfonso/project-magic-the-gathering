import { Injectable } from '@nestjs/common';
import { DeckBaseUseCase } from './deck-base.usecase';
import { Card } from '@/infraestructure/schemas/card.schema';

@Injectable()
export class FetchUsersDecks extends DeckBaseUseCase {
  async execute(sub: string) {
    const cachedUserDecks: Card[] =
      await this.cacheManager.get('get-user-decks');

    if (cachedUserDecks) {
      return {
        decks: cachedUserDecks,
        items: cachedUserDecks.length,
      };
    } else {
      const fetchedUserDecks = await this.decksRepository.findUsersDecks(sub);
      await this.cacheManager.set('get-user-decks', fetchedUserDecks);
      return {
        decks: fetchedUserDecks,
        items: fetchedUserDecks.length,
      };
    }
  }
}
