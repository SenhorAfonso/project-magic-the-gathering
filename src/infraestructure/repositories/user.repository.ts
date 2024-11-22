import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async create(user: User): Promise<UserDocument> {
    return this.userModel.create(user);
  }

  public async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().select(['-password']);
  }

  public async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).select(['-password']);
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findUserByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  async findUserById(userId: string) {
    return this.userModel.findById(userId);
  }
}
