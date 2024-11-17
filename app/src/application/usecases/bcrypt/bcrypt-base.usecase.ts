import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export abstract class BcryptBaseUseCase {
  constructor(protected readonly configService: ConfigService) {}

  getSalt(): string {
    return this.configService.get<string>('BCRYPT_SALT');
  }

  abstract execute(...args: any): any;
}
