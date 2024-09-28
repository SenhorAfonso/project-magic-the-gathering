import { CardDto } from '../dtos/cards/cards.dto';
import AdapterCreate from '@/infraestructure/common/adapter/createDto.adapter';
import { Card } from '@/infraestructure/schemas/card.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class cardAdapter implements AdapterCreate<Card, CardDto> {
  public createToEntity(dto: CardDto): Card {
    return {
      name: dto.name,
      manaCost: dto.manaCost,
      cmc: dto.cmc,
      colors: dto.colors,
      colorIdentity: dto.colorIdentity,
      type: dto.type,
      supertypes: dto.supertypes,
      types: dto.types,
      subtypes: dto.subtypes,
      rarity: dto.rarity,
      set: dto.set,
      setName: dto.setName,
      text: dto.text,
      artist: dto.artist,
      number: dto.number,
      power: dto.power,
      toughness: dto.toughness,
      layout: dto.layout,
      multiverseid: dto.multiverseid,
      imageUrl: dto.imageUrl,
      variations: dto.variations,
      rulings: dto.rulings,
    } as Card;
  }
}
