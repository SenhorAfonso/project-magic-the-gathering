import { DecksRepository } from '@/infraestructure/repositories/decks.repository';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export abstract class DeckBaseUseCase {
  constructor(
    protected readonly decksRepository: DecksRepository,
    protected readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) protected cacheManager: Cache,
  ) {}

  abstract execute(...args: any): any;
}
