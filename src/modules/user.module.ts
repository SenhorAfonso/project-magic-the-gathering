import UserAdapter from '@/application/adapters/user.adapter';
import { CheckIfUserExistsUseCase } from '@/application/usecases/users/check-if-user-exists.usecase';
import { CreateUserUseCase } from '@/application/usecases/users/create-user.usecase';
import { GetUserByEmailUseCase } from '@/application/usecases/users/get-user-by-email.usecase';
import { GetUserByUsernameUseCase } from '@/application/usecases/users/get-user-by-name.usecase';
import { UserController } from '@/infraestructure/controllers/user.controller';
import { UserRepository } from '@/infraestructure/repositories/user.repository';
import { UserSchema } from '@/infraestructure/schemas/user.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [
    CheckIfUserExistsUseCase,
    CreateUserUseCase,
    GetUserByEmailUseCase,
    GetUserByUsernameUseCase,
    UserRepository,
    UserAdapter,
  ],
  exports: [
    GetUserByEmailUseCase,
    GetUserByUsernameUseCase,
    CheckIfUserExistsUseCase,
    CreateUserUseCase,
  ],
})
export class UserModule {}
