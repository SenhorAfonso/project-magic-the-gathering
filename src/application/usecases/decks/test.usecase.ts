import { Injectable } from '@nestjs/common';
import { DeckBaseUseCase } from './deck-base.usecase';

@Injectable()
export class TestUseCase extends DeckBaseUseCase {
  async execute() {
    await this.kafkaProduceMessage.execute('deck_import_queue', {
      value: JSON.stringify('deck data'),
    });
  }
}
