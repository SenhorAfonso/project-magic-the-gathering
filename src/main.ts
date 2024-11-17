import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { cpus } from 'os';
import cluster from 'cluster';
import * as compression from 'compression';
import queue from 'express-queue';

async function bootstrap() {
  let masterPID: number;

  if (cluster.isPrimary) {
    const numCPUs = cpus().length;

    masterPID = process.pid;
    console.log(`primary process started with PID: ${masterPID}`);
    console.log(`Forking ${numCPUs} workers...`);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code) => {
      if (code !== 0) {
        console.log(`Worker ${worker.process.pid} died. Restating....`);
        cluster.fork();
      }
    });
  } else {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.use(queue({ activeLimit: 12, queuedLimit: 50 }));
    app.use(compression.default({ threshold: 100 }));
    await app.listen(3001);
  }
}
bootstrap();
