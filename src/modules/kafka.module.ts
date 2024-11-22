import { Module } from '@nestjs/common';
import { DecksModule } from './decks.module'; // Atualize o caminho conforme necessário
import { ImportDeckUseCase } from '@/application/usecases/decks/import-deck.usecase';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DecksModule, // Importe o DecksModule aqui
  ],
  providers: [ImportDeckUseCase, ConfigService],
})
export class KafkaModule {}
