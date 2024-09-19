import { AuthController } from "@/infraestructure/controllers/auth.controller";
import { Module } from "@nestjs/common";
import { UserModule } from "./user.module";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { LoginUserUseCase } from "@/application/usecases/auth/login-user.usecase";
import { RegisterUserUseCase } from "@/application/usecases/auth/register-user.usecase";
import { BcryptModule } from "./bcrypt.module";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    controllers: [AuthController],
    imports: [
        UserModule,
        BcryptModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                global: true,
                secret: configService.get<string>('JWT_SECRET'),
            }),
            inject: [ConfigService]
        })
    ],
    providers: [
        LoginUserUseCase,
        RegisterUserUseCase,
        JwtService
    ]
    
})
export class AuthModule {}