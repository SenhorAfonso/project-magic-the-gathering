import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Deck, DeckSchema } from '../infraestructure/schemas/deck.schema';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { DecksController } from '@/infraestructure/controllers/decks.controller';
import { DecksRepository } from '@/infraestructure/repositories/decks.repository';
import { FetchBasicLandsUseCase } from '@/application/usecases/decks/fetch-basic-lands.usecase';
import { FetchCommanderUseCase } from '@/application/usecases/decks/fetch-commander.usecase';
import { FindAllDecksUseCase } from '@/application/usecases/decks/find-all-decks.usecase';
import { BuildDeckUseCase } from '@/application/usecases/decks/build-deck.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Deck.name, schema: DeckSchema }]),
    ConfigModule.forRoot(),
  ],
  controllers: [DecksController],
  providers: [
    FetchBasicLandsUseCase,
    FetchCommanderUseCase,
    FindAllDecksUseCase,
    BuildDeckUseCase,
    DecksRepository],
})
export class DecksModule {}
