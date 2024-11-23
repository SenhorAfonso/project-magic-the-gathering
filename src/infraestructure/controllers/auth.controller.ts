import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserUseCase } from '@/application/usecases/auth/login-user.usecase';
import { RegisterUserUseCase } from '@/application/usecases/auth/register-user.usecase';
import { LoginUserDto } from '@/application/dtos/users/login-user.dto';
import { RegisterUserDTo } from '@/application/dtos/users/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly registerUserUSeCase: RegisterUserUseCase,
  ) {}

  @Post('/register')
  async userRegister(@Body() registerUserDto: RegisterUserDTo) {
    const token = await this.registerUserUSeCase.execute(registerUserDto);
    return token;
  }

  @Post('/login')
  async userLogin(@Body() loginUserDto: LoginUserDto) {
    console.log(loginUserDto)
    const token = await this.loginUserUseCase.execute(loginUserDto);
    return token;
  }
}
