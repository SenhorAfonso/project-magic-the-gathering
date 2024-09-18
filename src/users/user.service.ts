import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { Token } from '@/auth/token';
import { Password } from '@/utils/password';
import { LoginUserDto } from './dto/login-user.dto';
import UserAdapter from './user.adapter';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    protected readonly userRepository: UserRepository,
    protected readonly adapter: UserAdapter,
    protected readonly token: Token,
  ) {}

  public async create(newUser: CreateUserDto): Promise<void> {
    const existsUser: User | null = await this.validateEmailOrUsername(newUser);

    if (existsUser) {
      throw new Error('User already exists');
    }

    const user: User = this.adapter.createToEntity(newUser);
    user.password = await Password.generateEncrypted(user.password);
    await this.userRepository.create(user);
  }

  public async login(loginUser: LoginUserDto): Promise<string> {
    const foundUser: User | null = await this.validateEmailOrUsername(
      loginUser as CreateUserDto,
    );

    if (!foundUser) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const userIsValid: boolean | null = await Password.verify(
      loginUser.password,
      foundUser.password,
    );

    if (!userIsValid) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    return this.token.generateToken(foundUser);
  }

  private async validateEmailOrUsername(
    user: LoginUserDto,
  ): Promise<User | null> {
    return this.userRepository.findByEmailOrUsername(user.email, user.username);
  }
}
