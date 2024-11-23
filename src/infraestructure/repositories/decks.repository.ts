import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Deck } from '../schemas/deck.schema';

@Injectable()
export class DecksRepository {
  constructor(
    @InjectModel(Deck.name) private readonly deckModel: Model<Deck>,
  ) {}

  async create(deck: Deck): Promise<Deck> {
    const createdDeck = new this.deckModel(deck);
    return await createdDeck.save();
  }

  async findAll(): Promise<Deck[]> {
    return await this.deckModel.find().exec();
  }

  async findUsersDecks(sub): Promise<Deck[]> {
    return await this.deckModel.find({ userId: sub });
  }

  async findDeckById(deckId: string): Promise<Deck> {
    return await this.deckModel.findById({ _id: deckId });
  }
}
