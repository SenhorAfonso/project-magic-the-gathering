import { WsBaseUseCase } from './ws-base.usecase';

export class WsCreateDeckUseCase extends WsBaseUseCase {
  execute(create: any) {
    this.server.emit('create', create);
  }
}
