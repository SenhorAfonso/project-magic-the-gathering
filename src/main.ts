import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import cluster from 'cluster';
import * as compression from 'compression';
import queue from 'express-queue';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

type BoostrapConfiguration = {
  useClusters: boolean;
  max_clusters: number;
};

class bootstrap {
  private readonly configuration: BoostrapConfiguration;
  constructor(configuration: BoostrapConfiguration) {
    this.configuration = configuration;

    const { useClusters: useCluster } = this.configuration;

    if (useCluster) {
      this.cluster();
      return;
    }
    this.createApp();
  }

  async createApp() {
    const app = await NestFactory.create(AppModule);

    await this.setPipes(app);
    await this.setMiddlewares(app);
    await this.createMicroservice(app);

    await app.startAllMicroservices();
    await app.listen(3001);
  }

  async createMicroservice(app: INestApplication) {
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'decks',
        },
      },
    });
  }

  async setPipes(app: INestApplication) {
    app.useGlobalPipes(new ValidationPipe());
  }

  async setMiddlewares(app: INestApplication) {
    app.use(queue({ activeLimit: 12, queuedLimit: 50 }));
    app.use(compression.default({ threshold: 100 }));
  }

  async cluster() {
    if (cluster.isPrimary) {
      console.log(`Master cluster setting up ${this.configuration.max_clusters} workers...`);
      for (let i = 0; i < this.configuration.max_clusters; i++) {
        cluster.fork();
      }
      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
      });
    } else {
      await this.createApp();
    }
  }
}
new bootstrap({
  useClusters: false,
  max_clusters: 4,
});
