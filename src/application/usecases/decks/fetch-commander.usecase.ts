import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeckBaseUseCase } from "./deck-base.usecase";
import axios from "axios";

@Injectable()
export class FetchCommanderUseCase extends DeckBaseUseCase {
    async execute(commanderName: string) {
        const URL = this.configService.get<string>('API_URL')
        const commanderUrl = `${URL}?type=Legendary Creature&name=${commanderName}`;
        const commanderResponse = await axios.get(commanderUrl);
        const commander = commanderResponse.data.cards[0];

        if (!commander) {
            throw new HttpException('Comandante not found', HttpStatus.NOT_FOUND);
        }

        return commander;
    }
}