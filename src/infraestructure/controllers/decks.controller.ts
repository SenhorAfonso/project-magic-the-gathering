import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/jwt.guard';
import { FetchBasicLandsUseCase } from '@/application/usecases/decks/fetch-basic-lands.usecase';
import { FetchCommanderUseCase } from '@/application/usecases/decks/fetch-commander.usecase';
import { FindAllDecksUseCase } from '@/application/usecases/decks/find-all-decks.usecase';
import { BuildDeckUseCase } from '@/application/usecases/decks/build-deck.usecase';

@Controller('decks')
@UseGuards(JwtAuthGuard)
export class DecksController {
  constructor(
    private readonly fetchBasicLands: FetchBasicLandsUseCase,
    private readonly fetchCommander: FetchCommanderUseCase,
    private readonly findAllDecks: FindAllDecksUseCase,
    private readonly buildDeck: BuildDeckUseCase
  ) {}


  @Get('commander/:commanderName')
  async getCommander(@Param('commanderName') commanderName: string) {
    return this.fetchCommander.execute(commanderName);
  }

  @Post('generate/:commanderName/:userId')
  async createDeck(
    @Param('commanderName') commanderName: string,
    @Param('userId') userId: string,
  ) {
    return await this.buildDeck.execute(commanderName, userId);
  }

  @Get('test-basic-lands/:colors')
  async testFetchBasicLands(@Param('colors') colors: string) {
    return this.fetchBasicLands.execute(colors);
  }

  @Get()
  async findAll() {
    return this.findAllDecks.execute();
  }
}
