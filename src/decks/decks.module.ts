import { Module } from '@nestjs/common';
import { DecksService } from './decks.service';
import { DecksController } from './decks.controller';
import { DecksRepository } from './decks.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Deck, DeckSchema } from './schema/deck.schema';
import { ConfigModule } from '@nestjs/config/dist/config.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Deck.name, schema: DeckSchema }]),
    ConfigModule.forRoot(),
  ],
  controllers: [DecksController],
  providers: [DecksService, DecksRepository],
})
export class DecksModule {}
