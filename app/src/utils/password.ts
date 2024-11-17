import * as bcrypt from 'bcrypt';

export class Password {
  private static readonly ROUNDS: number = 10;

  public static async generateEncrypted(password: string): Promise<string> {
    return bcrypt.hash(password, this.ROUNDS);
  }

  public static async verify(
    password: string,
    encrypted: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, encrypted);
  }
}
