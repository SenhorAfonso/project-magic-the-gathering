import { ValidateDeckUseCase } from '@/application/usecases/decks/validate-deck.usecase';
import { KafkaProduceMessageUseCase } from '@/application/usecases/kafka/kafka-producer.usecase';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class KafkaController {
  constructor(
    private readonly validateDeckUseCase: ValidateDeckUseCase,
    private readonly kafkaProduceMessage: KafkaProduceMessageUseCase,
  ) {}

  @MessagePattern('deck_import_queue')
  async getMessage(@Payload() message: any) {
    const { isValid } = this.validateDeckUseCase.execute(message);

    if (isValid) {
      this.kafkaProduceMessage.execute('deck_updates_queue', {
        value: JSON.stringify(message),
      });
    }
  }
}
