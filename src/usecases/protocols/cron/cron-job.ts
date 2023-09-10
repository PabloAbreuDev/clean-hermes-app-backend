export interface CreateCronJobDto {
	cronExpression: string;
	id: string;
	callBackFunction: () => void;
}

export interface activeJob {
	id: string;
	job: any;
}

export interface ICronJob {
	activeJobs: activeJob[];
	create(data: CreateCronJobDto): boolean;
}
