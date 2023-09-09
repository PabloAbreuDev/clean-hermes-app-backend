import { User } from "../entities/user";

export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
}

export interface IRegisterUser {
  execute(data: RegisterUserDto): Promise<User | null>;
}
