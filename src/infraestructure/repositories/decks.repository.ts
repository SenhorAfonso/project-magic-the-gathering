import { CreateDeckDto } from '@/application/dtos/decks/create-deck.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Deck } from '../schemas/deck.schema';

@Injectable()
export class DecksRepository {
  constructor(
    @InjectModel(Deck.name) private readonly deckModel: Model<Deck>,
  ) {}

  async create(createDeckDto: CreateDeckDto): Promise<Deck> {
    const createdDeck = new this.deckModel(createDeckDto);
    return await createdDeck.save();
  }

  async findAll(): Promise<Deck[]> {
    return await this.deckModel.find().exec();
  }
}
