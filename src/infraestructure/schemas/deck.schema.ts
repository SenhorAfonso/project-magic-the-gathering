import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CardSchema } from './card.schame';
import { Card } from './card.schame';


@Schema()
export class Deck extends Document {
  @Prop({ required: true })
  commander: string;

  @Prop({ type: [CardSchema], required: true })
  cards: Card[];

  @Prop({ required: true })
  userId: string;
}

export const DeckSchema = SchemaFactory.createForClass(Deck);
