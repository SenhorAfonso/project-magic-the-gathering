import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { GetUserByEmailUseCase } from "../users/get-user-by-email.usecase";
import { GetUserByUsernameUseCase } from "../users/get-user-by-name.usecase";
import { CreateUserUseCase } from "../users/create-user.usecase";
import { CheckIfUserExistsUseCase } from "../users/check-if-user-exists.usecase";
import { ComparePasswordUseCase } from "../bcrypt/compare-password.usecase";
import { HashPasswordUseCase } from "../bcrypt/hash-password.usercase";

@Injectable()
export abstract class AuthBaseUseCase {
    constructor(
        protected readonly jwtService: JwtService,
        protected readonly getUserByEmail: GetUserByEmailUseCase,
        protected readonly getUserByUsername: GetUserByUsernameUseCase,
        protected readonly checkIfUserExists: CheckIfUserExistsUseCase,
        protected readonly createUser: CreateUserUseCase,
        protected readonly hashPassword: HashPasswordUseCase,
        protected readonly verifyPassword: ComparePasswordUseCase

    ) {}

    abstract execute(...args: any): any
} 