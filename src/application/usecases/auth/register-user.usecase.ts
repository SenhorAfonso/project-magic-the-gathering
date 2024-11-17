import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthBaseUseCase } from './auth-base-usecase';
import { RegisterUserDTo } from '@/application/dtos/users/register-user.dto';

@Injectable()
export class RegisterUserUseCase extends AuthBaseUseCase {
  async execute(registerUserDto: RegisterUserDTo) {
    const { username, email, password } = registerUserDto;

    const existingUser = await this.checkIfUserExists.execute(username, email);

    if (existingUser) {
      throw new BadRequestException('Email or username already taken');
    }

    registerUserDto.password = await this.hashPassword.execute(password);
    const user = await this.createUser.execute(registerUserDto);

    const jwtPayload = {
      username,
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get('SECRET_KEY'),
      }),
    };
  }
}
