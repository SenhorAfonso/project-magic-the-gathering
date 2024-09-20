import { Injectable, NotFoundException } from '@nestjs/common';
import { DeckBaseUseCase } from './deck-base.usecase';
import axios from 'axios';
import { Card } from '@/infraestructure/schemas/deck.schema';

@Injectable()
export class FetchCommandersNameUseCase extends DeckBaseUseCase {
  async execute() {
    const URL = `${this.configService.get<string>('API_URL')}?type=Legendary Creature`;

    const commanderResponse = await axios.get(URL);
    const cards: Card[] = commanderResponse.data.cards;

    const commandersNames = cards.map((card) => {
      return {
        name: card.name,
        colors: card.colors,
      };
    });

    if (commandersNames.length === 0) {
      throw new NotFoundException('Commander not found');
    }

    return commandersNames;
  }
}
