import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async create(user: User): Promise<User> {
    return this.userModel.create(user);
  }

  public async findAll(): Promise<User[]> {
    return this.userModel.find().select(['-password']);
  }

  public async findById(id: string): Promise<User> {
    return this.userModel.findById(id).select(['-password']);
  }

  public async findByEmailOrUsername(
    email: string,
    name: string,
  ): Promise<User | null> {
    return this.userModel
      .findOne({ $or: [{ email: email }, { username: name }] })
      .exec();
  }
}
