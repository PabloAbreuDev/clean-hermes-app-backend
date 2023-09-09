export interface GenerateTelegramUrlDto {
  id: string;
}

export interface IGenerateTelegramUrl {
  execute(data: GenerateTelegramUrlDto): Promise<string>;
}
