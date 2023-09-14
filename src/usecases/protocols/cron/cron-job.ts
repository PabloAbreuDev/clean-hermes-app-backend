export interface CreateCronJobDto {
  cronExpression: string;
  id: string;
  callBackFunction: () => void;
}

export interface CancelCronJobDto {
  id: string;
}

export interface ICronJob {
  create(data: CreateCronJobDto): boolean;
  cancel(data: CancelCronJobDto): boolean;
}
