import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(3001, { namespace: 'events' })
export class WsGateway {
  @WebSocketServer()
  server: Server;

  handleConnection() {
    console.log('cliente conectado');
  }

  handleDisconnect() {
    console.log('cliente disconectado');
  }
}
