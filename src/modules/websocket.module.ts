import { Module } from '@nestjs/common';
import { WsCreateDeckUseCase } from '@/application/usecases/websocket/ws-create-deck.usecase';
import { WsUpdateDeckUseCase } from '@/application/usecases/websocket/ws-update-deck.usecase';

@Module({
  providers: [WsCreateDeckUseCase, WsUpdateDeckUseCase],

  exports: [WsCreateDeckUseCase, WsUpdateDeckUseCase],
})
export class WebSocketModule {}
