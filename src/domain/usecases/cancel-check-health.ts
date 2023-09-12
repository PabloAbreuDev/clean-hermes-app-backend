export interface CancelCheckHealthDto {
  checkHealthId: string;
  userId: string;
}
export interface ICancelCheckHealth {
  execute(data: CancelCheckHealthDto): Promise<boolean>;
}
