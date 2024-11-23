import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

export abstract class KafkaBaseUseCase implements OnModuleInit {
  constructor(
    @Inject('KAFKA_CLIENT') protected readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  abstract execute(topic: string, message: any): Promise<void>;
}
