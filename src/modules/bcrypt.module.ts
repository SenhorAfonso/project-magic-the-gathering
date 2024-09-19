import { ComparePasswordUseCase } from "@/application/usecases/bcrypt/compare-password.usecase";
import { HashPasswordUseCase } from "@/application/usecases/bcrypt/hash-password.usercase";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [ConfigModule],
    providers: [
        ComparePasswordUseCase,
        HashPasswordUseCase,
    ],
    exports: [
        ComparePasswordUseCase,
        HashPasswordUseCase
    ]
})
export class BcryptModule {}