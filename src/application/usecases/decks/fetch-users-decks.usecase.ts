import { Injectable } from '@nestjs/common';
import { DeckBaseUseCase } from './deck-base.usecase';

@Injectable()
export class FetchUsersDecks extends DeckBaseUseCase {
  async execute(sub: string) {
    const usersDecks = await this.decksRepository.findUsersDecks(sub);
    return {
      decks: usersDecks,
      items: usersDecks.length,
    };
  }
}
