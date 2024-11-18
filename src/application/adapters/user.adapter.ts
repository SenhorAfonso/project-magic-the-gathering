import { CreateUserDto } from '@/application/dtos/users/create-user.dto';
import { UpdateUserDto } from '@/application/dtos/users/update-user.dto';
import AdapterCreate from '@/infraestructure/common/adapter/createDto.adapter';
import AdapterUpdate from '@/infraestructure/common/adapter/updateDto.adapter';
import { User } from '../../infraestructure/schemas/user.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class UserAdapter
  implements
    AdapterCreate<User, CreateUserDto>,
    AdapterUpdate<User, UpdateUserDto>
{
  public updateToEntity(dto: UpdateUserDto): User {
    return {
      email: dto.email,
      username: dto.username,
      role: dto.role,
    } as User;
  }

  public createToEntity(dto: CreateUserDto): User {
    return {
      email: dto.email,
      username: dto.username,
      password: dto.password,
      role: dto.role,
    } as User;
  }
}
