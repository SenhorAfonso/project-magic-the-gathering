import { WsBaseUseCase } from './ws-base.usecase';

export class WsUpdateDeckUseCase extends WsBaseUseCase {
  execute(update: any) {
    this.server.emit('update', update);
  }
}
