import { CreateDeckDto } from '../dtos/decks/create-deck.dto';
import AdapterCreate from '@/infraestructure/common/adapter/createDto.adapter';
import { Deck } from '@/infraestructure/schemas/deck.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class DeckAdapter implements AdapterCreate<Deck, CreateDeckDto> {
  public createToEntity(dto: CreateDeckDto) {
    return {
      commander: dto.commander,
      cards: dto.cards,
      userId: dto.userId,
      deckOwner: dto.deckOwner,
    } as Deck;
  }
}
