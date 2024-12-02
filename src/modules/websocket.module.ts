import { Module } from '@nestjs/common';
import { WsCreateDeckUseCase } from '@/application/usecases/websocket/ws-create-deck.usecase';
import { WsUpdateDeckUseCase } from '@/application/usecases/websocket/ws-update-deck.usecase';
import { WsGateway } from '@/infraestructure/gateways/ws.gateway';

@Module({
  providers: [WsCreateDeckUseCase, WsUpdateDeckUseCase, WsGateway],
  exports: [WsCreateDeckUseCase, WsUpdateDeckUseCase],
})
export class WebSocketModule {}
