import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CardSchema } from './card.schema';
import { Card } from './card.schema';

@Schema()
export class Deck extends Document {
  @Prop({ required: true })
  commander: string;

  @Prop({ type: [CardSchema], required: true })
  cards: Card[];

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  deckOwner: string;
}

export const DeckSchema = SchemaFactory.createForClass(Deck);
