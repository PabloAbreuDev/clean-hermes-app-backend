export interface GenerateTelegramUrlDto {
  userId: string;
}

export interface IGenerateTelegramUrl {
  execute(data: GenerateTelegramUrlDto): Promise<string>;
}
