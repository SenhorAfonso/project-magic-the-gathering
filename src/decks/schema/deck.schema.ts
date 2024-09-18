import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Card {
  @Prop({ required: true })
  name: string;

  @Prop()
  manaCost: string;

  @Prop()
  cmc: number;

  @Prop({ type: [String] })
  colors: string[];

  @Prop({ type: [String] })
  colorIdentity: string[];

  @Prop()
  type: string;

  @Prop({ type: [String] })
  supertypes: string[];

  @Prop({ type: [String] })
  types: string[];

  @Prop({ type: [String] })
  subtypes: string[];

  @Prop()
  rarity: string;

  @Prop()
  set: string;

  @Prop()
  setName: string;

  @Prop()
  text: string;

  @Prop()
  artist: string;

  @Prop()
  number: string;

  @Prop()
  power: string;

  @Prop()
  toughness: string;

  @Prop()
  layout: string;

  @Prop()
  multiverseid: string;

  @Prop()
  imageUrl: string;

  @Prop({ type: [String] })
  variations: string[];

  @Prop({
    type: [{ date: String, text: String }],
  })
  rulings: Array<{ date: string; text: string }>;
}

export const CardSchema = SchemaFactory.createForClass(Card);

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
