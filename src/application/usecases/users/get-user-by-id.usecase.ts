import { BadRequestException, Injectable } from '@nestjs/common';
import { UserBaseUseCase } from './user-base-usecase';
import { UserDocument } from '@/infraestructure/schemas/user.schema';

@Injectable()
export class GetUserByIdUseCase extends UserBaseUseCase {
  async execute(userId: string): Promise<UserDocument | null> {
    if (!userId) {
      throw new BadRequestException('Must provide a valid userId');
    }
    return this.userRepository.findUserById(userId);
  }
}
