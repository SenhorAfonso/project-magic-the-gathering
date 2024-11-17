import { Injectable } from '@nestjs/common';
import { DeckBaseUseCase } from './deck-base.usecase';
import axios from 'axios';

@Injectable()
export class FetchBasicLandsUseCase extends DeckBaseUseCase {
  async execute(allowedColors: string) {
    const URL = this.configService.get<string>('API_URL');
    const basicLandUrl = `${URL}?type=Basic Land&colorIdentity=${allowedColors}`;
    const basicLandResponse = await axios.get(basicLandUrl);
    const basicLands = basicLandResponse.data.cards;
    const filteredBasicLands = basicLands.slice(0, 99);

    return filteredBasicLands;
  }
}
