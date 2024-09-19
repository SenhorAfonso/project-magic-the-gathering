import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CardDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  manaCost: string;

  @IsArray()
  colors: string[];

  @IsArray()
  colorIdentity: string[];

  @IsString()
  type: string;

  @IsArray()
  supertypes: string[];

  @IsArray()
  types: string[];

  @IsArray()
  subtypes: string[];

  @IsString()
  rarity: string;

  @IsString()
  set: string;

  @IsString()
  setName: string;

  @IsString()
  text: string;

  @IsString()
  artist: string;

  @IsString()
  number: string;

  @IsString()
  power: string;

  @IsString()
  toughness: string;

  @IsString()
  layout: string;

  @IsString()
  multiverseid: string;

  @IsString()
  imageUrl: string;

  @IsArray()
  variations: string[];

  @IsArray()
  rulings: Array<{ date: string; text: string }>;
}
