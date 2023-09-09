import { HashComparer } from "../../usecases/protocols/crypto/hash-comparer";
import { Hasher } from "../../usecases/protocols/crypto/hasher";
import bcrypt from "bcrypt";

export class BCryptAdapter implements Hasher, HashComparer {
  constructor(private readonly saltRounds: number) {}
  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.saltRounds);
    return hash;
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash);
    return isValid;
  }
}
