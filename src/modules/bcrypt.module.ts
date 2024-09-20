import { ComparePasswordUseCase } from '@/application/usecases/bcrypt/compare-password.usecase';
import { HashPasswordUseCase } from '@/application/usecases/bcrypt/hash-password.usercase';
import { Module } from '@nestjs/common';

@Module({
  providers: [ComparePasswordUseCase, HashPasswordUseCase],
  exports: [ComparePasswordUseCase, HashPasswordUseCase],
})
export class BcryptModule {}
