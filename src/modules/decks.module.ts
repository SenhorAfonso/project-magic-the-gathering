import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Deck, DeckSchema } from '../infraestructure/schemas/deck.schema';
import { DecksController } from '@/infraestructure/controllers/decks.controller';
import { DecksRepository } from '@/infraestructure/repositories/decks.repository';
import { FetchBasicLandsUseCase } from '@/application/usecases/decks/fetch-basic-lands.usecase';
import { FetchCommanderUseCase } from '@/application/usecases/decks/fetch-commander.usecase';
import { FindAllDecksUseCase } from '@/application/usecases/decks/find-all-decks.usecase';
import { BuildDeckUseCase } from '@/application/usecases/decks/build-deck.usecase';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { FetchCommandersNameUseCase } from '@/application/usecases/decks/fetch-commanders-name.usecase';
import { FetchUsersDecks } from '@/application/usecases/decks/fetch-users-decks.usecase';
import { ImportDeckUseCase } from '@/application/usecases/decks/import-deck.usecase';
import { ValidateDeckUseCase } from '@/application/usecases/decks/validate-deck.usecase';
import DeckAdapter from '@/application/adapters/deck.adapter';
import CardAdapter from '@/application/adapters/card.adapter';
import { UserModule } from './user.module';
import { FetchUserSingleDeck } from '@/application/usecases/decks/find-user-single-deck.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Deck.name, schema: DeckSchema }]),
    UserModule,
  ],
  controllers: [DecksController],
  providers: [
    FetchBasicLandsUseCase,
    FetchUserSingleDeck,
    FetchCommanderUseCase,
    FindAllDecksUseCase,
    FetchCommandersNameUseCase,
    FetchUsersDecks,
    BuildDeckUseCase,
    ImportDeckUseCase,
    ValidateDeckUseCase,
    CardAdapter,
    DeckAdapter,
    DecksRepository,
    JwtService,
    ConfigService,
  ],
})
export class DecksModule {}
