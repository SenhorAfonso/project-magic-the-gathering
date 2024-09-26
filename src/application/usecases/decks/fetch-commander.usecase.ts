import { Injectable, NotFoundException } from '@nestjs/common';
import { DeckBaseUseCase } from './deck-base.usecase';
import axios from 'axios';
import { Card } from '@/infraestructure/schemas/card.schame';

@Injectable()
export class FetchCommanderUseCase extends DeckBaseUseCase {
  async execute(commanderName?: string) {
    let commander: Card;
    let URL = `${this.configService.get<string>('API_URL')}?type=Legendary Creature`;

    if (commanderName) {
      URL += `&name=${commanderName}`;
      const commanderResponse = await axios.get(URL);
      commander = commanderResponse.data.cards[0];
    } else {
      const commanderResponse = await axios.get(URL);
      const cards = commanderResponse.data.cards;

      commander = cards[Math.floor(Math.random() * cards.length)];
    }

    if (!commander) {
      throw new NotFoundException('Commander not found');
    }

    return commander;
  }
}
