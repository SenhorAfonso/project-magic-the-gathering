import { BadRequestException, Injectable } from '@nestjs/common';
import { UserBaseUseCase } from './user-base-usecase';
import { UserDocument } from '@/infraestructure/schemas/user.schema';

@Injectable()
export class GetUserByEmailUseCase extends UserBaseUseCase {
  async execute(email: string): Promise<UserDocument | null> {
    if (!email) {
      throw new BadRequestException('Must provide email');
    }
    return this.userRepository.findUserByEmail(email);
  }
}
