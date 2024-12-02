import { Injectable } from '@nestjs/common';
import { WsBaseUseCase } from './ws-base.usecase';

@Injectable()
export class WsCreateDeckUseCase extends WsBaseUseCase {
  execute(createDeck: any) {
    console.log('criando deck: ', createDeck);
    this.server.emit('create-deck', createDeck);
  }
}
