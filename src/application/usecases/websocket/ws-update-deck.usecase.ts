import { Injectable } from '@nestjs/common';
import { WsBaseUseCase } from './ws-base.usecase';

@Injectable()
export class WsUpdateDeckUseCase extends WsBaseUseCase {
  execute(updateDeck: any) {
    console.log('atualizando deck: ', updateDeck);
    this.server.emit('update-deck', updateDeck);
  }
}
