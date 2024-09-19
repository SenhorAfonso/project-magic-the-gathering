import { Injectable } from "@nestjs/common";
import { UserBaseUseCase } from "./user-base-usecase";
import { RegisterUserDTo } from "@/application/dtos/users/register-user.dto";
import { User, UserDocument } from "@/infraestructure/schemas/user.schema";

@Injectable()
export class CreateUserUseCase extends UserBaseUseCase {
    async execute(registerUserDto: RegisterUserDTo): Promise<UserDocument> {
        const user = this.userAdapter.createToEntity(registerUserDto);
        return this.userRepository.create(user);
    }
}
