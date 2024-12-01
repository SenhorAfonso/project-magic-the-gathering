import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(3001, { namespace: 'events' })
export abstract class WsBaseUseCase {
  @WebSocketServer()
  server: Server;

  handleConnection() {
    console.log('cliente conectado');
  }

  handleDisconnect() {
    console.log('cliente disconectado');
  }

  abstract execute(...args: any): any;
}
