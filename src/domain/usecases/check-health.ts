export interface CheckHealthDto {
	urlToCheck: string;
	checkHealthId: string;
}

export interface ICheckHealth {
	execute(data: CheckHealthDto): Promise<void>;
}
