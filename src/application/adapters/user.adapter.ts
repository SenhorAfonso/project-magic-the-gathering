import { CreateUserDto } from '@/application/dtos/users/create-user.dto';
import { UpdateUserDto } from '@/application/dtos/users/update-user.dto';
import Adapter from '../../infraestructure/common/adapter/adapter';
import { User } from '../../infraestructure/schemas/user.schema';
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
