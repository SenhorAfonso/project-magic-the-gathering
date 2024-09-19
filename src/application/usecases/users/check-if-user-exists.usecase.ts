import { BadRequestException, Injectable } from "@nestjs/common";
import { UserBaseUseCase } from "./user-base-usecase";
import { UserDocument } from "@/infraestructure/schemas/user.schema";
import { GetUserByEmailUseCase } from "./get-user-by-email.usecase";
import { GetUserByUsernameUseCase } from "./get-user-by-name.usecase";

@Injectable()
export class CheckIfUserExistsUseCase extends UserBaseUseCase {
    async execute(username: string, email: string): Promise<string> {
        if (!username && !email) {
            throw new BadRequestException('Must provide email or username');
        }

        const user = ''

        return user;
    }
}