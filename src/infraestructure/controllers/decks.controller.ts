import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FindAllDecksUseCase } from '@/application/usecases/decks/find-all-decks.usecase';
import { BuildDeckUseCase } from '@/application/usecases/decks/build-deck.usecase';
import { UserRole } from '../enums/user-role.enum';
import { Roles } from '../decorators/roles.decorators';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/user-roles.guard';
import { Request } from 'express';
import { FetchCommandersNameUseCase } from '@/application/usecases/decks/fetch-commanders-name.usecase';
import { FetchUsersDecks } from '@/application/usecases/decks/fetch-users-decks.usecase';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImportDeckUseCase } from '@/application/usecases/decks/import-deck.usecase';
import { ValidateDeckUseCase } from '@/application/usecases/decks/validate-deck.usecase';
import { FetchUserSingleDeck } from '@/application/usecases/decks/find-user-single-deck.usecase';

@Controller('decks')
export class DecksController {
  constructor(
    private readonly findAllDecks: FindAllDecksUseCase,
    private readonly buildDeck: BuildDeckUseCase,
    private readonly fetchCommandersNames: FetchCommandersNameUseCase,
    private readonly fetchUsersDecks: FetchUsersDecks,
    private readonly importDeckUseCase: ImportDeckUseCase,
    private readonly fetchUserSingleDeck: FetchUserSingleDeck,
    private readonly validateDeckUseCase: ValidateDeckUseCase,
  ) { }

  @Get('fetch-commanders')
  async getCommander() {
    return this.fetchCommandersNames.execute();
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async findAll() {
    return this.findAllDecks.execute({ useCache: true });
  }

  @Get('/admin/load-test')
  async findAllLoadTest() {
    return this.findAllDecks.execute({ useCache: true });
  }

  @Get('/create-deck')
  // @Roles(UserRole.PLAYER)
  @UseGuards(AuthGuard, RolesGuard)
  async createDeck(
    @Req() req: Request,
    @Query() query: { commanderName: string },
  ) {
    const { sub } = req.user as { sub: string };
    return this.buildDeck.execute(query.commanderName, sub);
  }

  @Post('upload-deck')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDeck(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const deckData = await this.importDeckUseCase.execute(file.buffer);
    this.validateDeckUseCase.execute(deckData);

    return { message: 'Deck validated sucessfully' };
  }

  @Get('/user-decks')
  @Roles(UserRole.PLAYER)
  @UseGuards(AuthGuard)
  async findUsersDecks(@Req() req: Request) {
    const { sub } = req.user as { sub: string };
    return await this.fetchUsersDecks.execute(sub);
  }

  @Get('/user-decks/:deckId')
  @Roles(UserRole.PLAYER)
  @UseGuards(AuthGuard)
  async findUserSingleDeck(@Param() params: { deckId: string }) {
    return this.fetchUserSingleDeck.execute(params.deckId);
  }
}
