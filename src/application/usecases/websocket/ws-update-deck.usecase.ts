import { WsGateway } from './ws-gateway.usecase';

export class WsUpdateDeck extends WsGateway {
  sendUpdateToClient(update: any) {
    this.server.emit('update', update);
  }
}
