import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { CardDto } from '../cards/cards.dto';

export class CreateDeckDto {
  @IsString()
  @IsNotEmpty()
  commander: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CardDto)
  cards: CardDto[];

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  deckOwner: string;
}
