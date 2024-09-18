import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateDeckDto } from './dto/create-deck.dto';
import { DecksRepository } from './decks.repository';
import axios from 'axios';
@Injectable()
export class DecksService {
  private readonly URL: string;
  constructor(
    private readonly deckRepository: DecksRepository,
    private readonly configService: ConfigService,
  ) {
    this.URL = this.configService.get<string>('API_URL');
  }

  public async fetchCommander(commanderName: string): Promise<any> {
    const commanderUrl = `${this.URL}?type=Legendary Creature&name=${commanderName}`;

    const commanderResponse = await axios.get(commanderUrl);
    //console.log(commanderResponse);
    const commander = commanderResponse.data.cards[0];

    if (!commander) {
      throw new HttpException('Comandante not found', HttpStatus.NOT_FOUND);
    }
    const allowedColors = commander.colorIdentity;

    return commander;
  }

  public async fetchBasicLands(allowedColors: string): Promise<any[]> {
    const basicLandUrl = `${this.URL}?type=Basic Land&colorIdentity=${allowedColors}`;
    const basicLandResponse = await axios.get(basicLandUrl);
    const basicLands = basicLandResponse.data.cards;
    const filteredBasicLands = basicLands.slice(0, 99);

    return filteredBasicLands;
  }

  public async buildDeck(commanderName: string, userId: string): Promise<any> {
    const commander = await this.fetchCommander(commanderName);
    const allowedColors = commander.colorIdentity.join('|');

    const basicLands = await this.fetchBasicLands(allowedColors);

    const deckCards = [commander, ...basicLands];

    const createDeckDto: CreateDeckDto = {
      commander: commander.name,
      cards: deckCards,
      userId: userId,
    };

    return await this.createDeck(createDeckDto);
  }

  public async createDeck(createDeckDto: CreateDeckDto): Promise<any> {
    return await this.deckRepository.create(createDeckDto);
  }

  public async findAll(): Promise<any[]> {
    return await this.deckRepository.findAll();
  }
}
