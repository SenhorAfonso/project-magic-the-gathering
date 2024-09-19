import { BadRequestException, Injectable } from "@nestjs/common";
import { AuthBaseUseCase } from "./auth-base-usecase";
import { LoginUserDto } from "@/application/dtos/users/login-user.dto";
import { UserDocument } from "@/infraestructure/schemas/user.schema";

@Injectable()
export class LoginUserUseCase extends AuthBaseUseCase {
    async execute(loginUserDto: LoginUserDto) {
        const { username, email, password } = loginUserDto;
        let user: UserDocument | null;

        // user = await this.checkIfUserExists.execute(username, email)
        
        if (!user) {
            throw new BadRequestException('Email, username or password are invalid');
        }

        const passwordIsInvalid = !(await this.verifyPassword.execute(password, user.password))
        
        if (passwordIsInvalid) {
            throw new BadRequestException('Email, username or password are invalid');
        }

        const jwtPayload = {
            username,
            sub: user.id
        }

        return {
            access_token: await this.jwtService.signAsync(jwtPayload),
        }
    }
}