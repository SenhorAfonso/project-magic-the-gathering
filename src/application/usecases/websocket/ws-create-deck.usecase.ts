import { Injectable } from '@nestjs/common';
import { WsBaseUseCase } from './ws-base.usecase';

@Injectable()
export class WsCreateDeckUseCase extends WsBaseUseCase {
  execute(create: any) {
    this.server.emit('create-deck', create);
  }
}
