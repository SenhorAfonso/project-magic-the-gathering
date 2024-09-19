// import { Module } from '@nestjs/common';
// import { UserService } from '../application/services/user.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UserSchema } from '../infraestructure/schemas/user.schema';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { JwtModule } from '@nestjs/jwt';
// import { Token } from '@/auth/token';
// import { JwtStrategy } from '@/auth/jwt.strategy';
// import UserAdapter from '../application/adapters/user.adapter';
// import { UserRepository } from '@/infraestructure/repositories/user.repository';
// import { UserController } from '@/infraestructure/controllers/user.controller';
// import { CheckIfUserExistsUseCase } from '@/application/usecases/users/check-if-user-exists.usecase';
// import { CreateUserUseCase } from '@/application/usecases/users/create-user.usecase';
// import { GetUserByEmailUseCase } from '@/application/usecases/users/get-user-by-email.usecase';
// import { GetUserByUsernameUseCase } from '@/application/usecases/users/get-user-by-name.usecase';
// import { RegisterUserUseCase } from '@/application/usecases/auth/register-user.usecase';

import UserAdapter from "@/application/adapters/user.adapter";
import { LoginUserUseCase } from "@/application/usecases/auth/login-user.usecase";
import { RegisterUserUseCase } from "@/application/usecases/auth/register-user.usecase";
import { HashPasswordUseCase } from "@/application/usecases/bcrypt/hash-password.usercase";
import { CheckIfUserExistsUseCase } from "@/application/usecases/users/check-if-user-exists.usecase";
import { CreateUserUseCase } from "@/application/usecases/users/create-user.usecase";
import { GetUserByEmailUseCase } from "@/application/usecases/users/get-user-by-email.usecase";
import { GetUserByUsernameUseCase } from "@/application/usecases/users/get-user-by-name.usecase";
import { UserController } from "@/infraestructure/controllers/user.controller";
import { UserRepository } from "@/infraestructure/repositories/user.repository";
import { UserSchema } from "@/infraestructure/schemas/user.schema";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
//   ],
//   controllers: [UserController],
//   providers: [
//     CheckIfUserExistsUseCase,
//     CreateUserUseCase,
//     GetUserByEmailUseCase,
//     GetUserByUsernameUseCase,
//     RegisterUserUseCase,
//     UserRepository,
//     UserAdapter,
//   ],
//   exports: [
//     CheckIfUserExistsUseCase,
//     CreateUserUseCase,
//     GetUserByEmailUseCase,
//     GetUserByUsernameUseCase,
//     RegisterUserUseCase,
//     MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
//   ],
// })
// export class UserModule { }
@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    controllers: [UserController],
    providers: [
        CheckIfUserExistsUseCase,
        CreateUserUseCase,
        GetUserByEmailUseCase,
        GetUserByUsernameUseCase,
        UserRepository,
        UserAdapter
    ],
    exports: [
        GetUserByEmailUseCase,
        GetUserByUsernameUseCase,
        CheckIfUserExistsUseCase,
        CreateUserUseCase,
    ]
})
export class UserModule {}