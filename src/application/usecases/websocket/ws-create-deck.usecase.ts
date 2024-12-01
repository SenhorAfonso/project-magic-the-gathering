import { WsGateway } from './ws-gateway.usecase';

export class WsCreateDeck extends WsGateway {
  sendCreateToClient(create: any) {
    this.server.emit('create', create);
  }
}
