import { Injectable } from '@nestjs/common';
import { FetchCommanderUseCase } from './fetch-commander.usecase';
import { FetchBasicLandsUseCase } from './fetch-basic-lands.usecase';
import { CreateDeckDto } from '@/application/dtos/decks/create-deck.dto';
import { DecksRepository } from '@/infraestructure/repositories/decks.repository';
import DeckAdapter from '@/application/adapters/deck.adapter';

@Injectable()
export class BuildDeckUseCase {
  constructor(
    private readonly fetchCommander: FetchCommanderUseCase,
    private readonly fetchBasicLands: FetchBasicLandsUseCase,
    private readonly decksRepository: DecksRepository,
    private readonly adapterDeck: DeckAdapter,
  ) {}
  async execute(commanderName: string, userId: string) {
    const commander = await this.fetchCommander.execute(commanderName);
    const allowedColors = commander.colorIdentity.join('|');

    const basicLands = await this.fetchBasicLands.execute(allowedColors);

    const deckCards = [commander, ...basicLands];

    const createDeckDto: CreateDeckDto = {
      commander: commander.name,
      cards: deckCards,
      userId: userId,
    };
    const deckEntity = this.adapterDeck.createToEntity(createDeckDto);

    return await this.decksRepository.create(deckEntity);
  }
}
