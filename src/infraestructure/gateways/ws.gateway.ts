import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsCreateDeckUseCase } from '@/application/usecases/websocket/ws-create-deck.usecase';
import { WsUpdateDeckUseCase } from '@/application/usecases/websocket/ws-update-deck.usecase';

@WebSocketGateway(3001, { namespace: 'events' })
export class WsGateway {
  @WebSocketServer() server: Server;
  constructor(
    private readonly websocketCreate: WsCreateDeckUseCase,
    private readonly websocketUpdate: WsUpdateDeckUseCase,
  ) {}

  handleConnection(client: Socket) {
    console.log('cliente conectado:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('cliente desconectado:', client.id);
  }

  @SubscribeMessage('createDeck')
  async handleCreateDeck(@MessageBody() createDeckDto: any) {
    await this.websocketCreate.execute(createDeckDto);
  }

  @SubscribeMessage('updateDeck')
  async handleUpdateDeck(@MessageBody() updateDeckDto: any) {
    await this.websocketUpdate.execute(updateDeckDto);
  }
}
