import * as bcrypt from 'bcrypt';
import { BcryptBaseUseCase } from './bcrypt-base.usecase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashPasswordUseCase extends BcryptBaseUseCase {
  public async execute(password: string): Promise<string> {
    return bcrypt.hash(password, this.getSalt());
  }
}
