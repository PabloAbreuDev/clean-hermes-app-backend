export interface LoginDto {
  email: string;
  password: string;
}

export interface ILogin {
  execute(data: LoginDto): Promise<string>;
}
