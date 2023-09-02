import bcrypt from "bcrypt";

export async function hashPassword(
  password: string,
  saltRounds: number
): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
}
