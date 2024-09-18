import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UserController {
  constructor(protected readonly userService: UserService) {}

  @Post()
  async create(@Body() user: CreateUserDto): Promise<void> {
    await this.userService.create(user);
  }

  @Post('login')
  async login(@Body() user: LoginUserDto): Promise<any> {
    return { token: await this.userService.login(user) };
  }
}
