import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

export abstract class WsBaseUseCase {
  @WebSocketServer() server: Server;
  abstract execute(...args: any): any;
}
