import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DecksService } from './decks.service';
import { JwtAuthGuard } from '@/auth/jwt.guard';

@Controller('decks')
@UseGuards(JwtAuthGuard)
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  // @Post()
  // async createDeck(@Body() createDeckDto: CreateDeckDto) {
  //   return this.decksService.createDeck(createDeckDto);
  // }

  @Get('commander/:commanderName')
  async getCommander(@Param('commanderName') commanderName: string) {
    return this.decksService.fetchCommander(commanderName);
  }

  @Post('generate/:commanderName/:userId')
  async createDeck(
    @Param('commanderName') commanderName: string,
    @Param('userId') userId: string,
  ) {
    return await this.decksService.buildDeck(commanderName, userId);
  }

  @Get('test-basic-lands/:colors')
  async testFetchBasicLands(@Param('colors') colors: string) {
    return this.decksService.fetchBasicLands(colors);
  }

  @Get()
  async findAll() {
    return this.decksService.findAll();
  }
}
