import { Injectable } from '@nestjs/common';
import { DecksRepository } from '@/infraestructure/repositories/decks.repository';

@Injectable()
export class FindAllDecksUseCase {
  constructor(private readonly decksRepository: DecksRepository) {}
  async execute() {
    return await this.decksRepository.findAll();
  }
}
