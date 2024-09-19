import { BadRequestException, Injectable } from "@nestjs/common";
import { UserDocument } from "@/infraestructure/schemas/user.schema";
import { UserBaseUseCase } from "./user-base-usecase";

@Injectable()
export class GetUserByUsernameUseCase extends UserBaseUseCase {
    async execute(username: string): Promise<UserDocument | null> {
        if (!username) {
            throw new BadRequestException('Must provide a username');
        }
        return this.userRepository.findUserByUsername(username);
    }
}