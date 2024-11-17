import { Injectable } from '@nestjs/common';
import { DeckBaseUseCase } from './deck-base.usecase';

@Injectable()
export class FindAllDecksUseCase extends DeckBaseUseCase {
  async execute(cache: { useCache: boolean }) {
    const { useCache } = cache;

    const cachedDecks = await this.cacheManager.get('get-all-users-decks');
    if (useCache && cachedDecks) {
      return cachedDecks;
    } else {
      const fetchedDecks = await this.decksRepository.findAll();
      await this.cacheManager.set('get-all-users-decks', fetchedDecks);
      return fetchedDecks;
    }
  }
}
