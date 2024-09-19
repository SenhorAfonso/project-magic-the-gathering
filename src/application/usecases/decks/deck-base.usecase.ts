import { DecksRepository } from "@/infraestructure/repositories/decks.repository";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export abstract class DeckBaseUseCase {
    constructor(
        protected readonly decksRepository: DecksRepository,
        protected readonly configService: ConfigService,
    ) {}

    abstract execute(...args: any): any;
}