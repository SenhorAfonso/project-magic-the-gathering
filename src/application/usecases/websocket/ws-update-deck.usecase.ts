import { Injectable } from '@nestjs/common';
import { WsBaseUseCase } from './ws-base.usecase';

@Injectable()
export class WsUpdateDeckUseCase extends WsBaseUseCase {
  execute(update: any) {
    this.server.emit('update-deck', update);
  }
}
