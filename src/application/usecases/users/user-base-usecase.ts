import { UserRepository } from "@/infraestructure/repositories/user.repository";
import { Injectable } from "@nestjs/common";
import { GetUserByEmailUseCase } from "./get-user-by-email.usecase";
import { GetUserByUsernameUseCase } from "./get-user-by-name.usecase";
import { CheckIfUserExistsUseCase } from "./check-if-user-exists.usecase";
import UserAdapter from "@/application/adapters/user.adapter";

@Injectable()
export abstract class UserBaseUseCase {
    constructor(
        protected readonly userRepository: UserRepository,
        protected readonly userAdapter: UserAdapter
    ) {}

    abstract execute(...args: any): any;
}