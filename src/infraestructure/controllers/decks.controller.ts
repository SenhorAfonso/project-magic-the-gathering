import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { FetchBasicLandsUseCase } from '@/application/usecases/decks/fetch-basic-lands.usecase';
import { FetchCommanderUseCase } from '@/application/usecases/decks/fetch-commander.usecase';
import { FindAllDecksUseCase } from '@/application/usecases/decks/find-all-decks.usecase';
import { BuildDeckUseCase } from '@/application/usecases/decks/build-deck.usecase';
import { UserRole } from '../enums/user-role.enum';
import { Roles } from '../decorators/roles.decorators';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/user-roles.guard';
import { Request } from 'express';
import { FetchCommandersNameUseCase } from '@/application/usecases/decks/fetch-commanders-name.usecase';
import { FetchUsersDecks } from '@/application/usecases/decks/fetch-users-decks.usecase';

@Controller('decks')
export class DecksController {
  constructor(
    private readonly fetchBasicLands: FetchBasicLandsUseCase,
    private readonly fetchCommander: FetchCommanderUseCase,
    private readonly findAllDecks: FindAllDecksUseCase,
    private readonly buildDeck: BuildDeckUseCase,
    private readonly fetchCommandersNames: FetchCommandersNameUseCase,
    private readonly fetchUsersDecks: FetchUsersDecks,
  ) {}

  @Get('fetch-commanders')
  async getCommander() {
    return this.fetchCommandersNames.execute();
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async findAll() {
    return this.findAllDecks.execute();
  }

  @Get('/create-deck')
  @Roles(UserRole.PLAYER)
  @UseGuards(AuthGuard, RolesGuard)
  async createDeck(
    @Req() req: Request,
    @Query() query: { commanderName: string },
  ) {
    const { sub } = req.user as { sub: string };

    return this.buildDeck.execute(query.commanderName, sub);
  }

  @Get('/users-decks')
  @Roles(UserRole.PLAYER)
  @UseGuards(AuthGuard, RolesGuard)
  async findUsersDecks(@Req() req: Request) {
    const { sub } = req.user as { sub: string };
    return this.fetchUsersDecks.execute(sub);
  }
}
