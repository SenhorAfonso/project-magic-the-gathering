import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Token } from '@/auth/token';
import { JwtStrategy } from '@/auth/jwt.strategy';
import { UserRepository } from './user.repository';
import UserAdapter from './user.adapter';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: { expiresIn: '60min' },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserAdapter, Token, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
