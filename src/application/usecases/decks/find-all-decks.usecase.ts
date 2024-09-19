import { Injectable } from "@nestjs/common";
import { DeckBaseUseCase } from "./deck-base.usecase";
import axios from "axios";
import { DecksRepository } from "@/infraestructure/repositories/decks.repository";

@Injectable()
export class FindAllDecksUseCase {
    constructor(private readonly decksRepository: DecksRepository) {}
    async execute() {
        return await this.decksRepository.findAll();
    }
}