import { Injectable } from '@nestjs/common';
import { KafkaBaseUseCase } from './kafka-base.usecase';

@Injectable()
export class KafkaProduceMessageUseCase extends KafkaBaseUseCase {
  async execute(topic: string, message: any) {
    this.kafkaClient.emit(topic, message);
  }
}
