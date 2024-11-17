import { BadRequestException, Injectable } from '@nestjs/common';
import { UserBaseUseCase } from './user-base-usecase';
import { UserDocument } from '@/infraestructure/schemas/user.schema';

@Injectable()
export class CheckIfUserExistsUseCase extends UserBaseUseCase {
  async execute(username: string, email: string): Promise<UserDocument> {
    if (!username && !email) {
      throw new BadRequestException('Must provide email or username');
    }

    const user =
      (await this.userRepository.findUserByEmail(email)) ??
      (await this.userRepository.findUserByUsername(username));

    return user;
  }
}
