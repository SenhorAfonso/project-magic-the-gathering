import Adapter from '../common/adapter/adapter';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class UserAdapter
  implements Adapter<User, CreateUserDto, UpdateUserDto>
{
  public updateToEntity(dto: UpdateUserDto): User {
    return {
      email: dto.email,
      username: dto.username,
    } as User;
  }

  public createToEntity(dto: CreateUserDto): User {
    return {
      email: dto.email,
      username: dto.username,
      password: dto.password,
    } as User;
  }
}
