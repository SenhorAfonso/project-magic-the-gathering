import { DecksRepository } from '@/infraestructure/repositories/decks.repository';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { KafkaProduceMessageUseCase } from '@/application/usecases/kafka/kafka-producer.usecase';
import { GetUserByIdUseCase } from '../users/get-user-by-id.usecase';

@Injectable()
export abstract class DeckBaseUseCase {
  constructor(
    protected readonly decksRepository: DecksRepository,
    protected readonly configService: ConfigService,
    protected readonly kafkaProduceMessage: KafkaProduceMessageUseCase,
    protected readonly getUserById: GetUserByIdUseCase,
    @Inject(CACHE_MANAGER) protected cacheManager: Cache,
  ) {}

  abstract execute(...args: any): any;
}
