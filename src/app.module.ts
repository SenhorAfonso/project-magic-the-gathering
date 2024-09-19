import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./modules/user.module";
import { DecksModule } from "./modules/decks.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/MTG-API'),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    DecksModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: { expiresIn: '60min' }
      })
    })
  ]
})
export class AppModule {}