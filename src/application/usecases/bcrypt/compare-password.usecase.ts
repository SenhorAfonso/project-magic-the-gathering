import * as bcrypt from 'bcrypt';
import { BcryptBaseUseCase } from './bcrypt-base.usecase';

export class ComparePasswordUseCase extends BcryptBaseUseCase {

    public async execute(password: string, encrypted: string): Promise<boolean> {
        return bcrypt.compare(password, encrypted);
    }
}
