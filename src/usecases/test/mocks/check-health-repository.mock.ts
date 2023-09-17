import { CheckHealthReportRepository } from "../../../infra/database/mongodb/repositories/check-health-report-repository";

export const mockCheckHealthRepository: jest.Mocked<CheckHealthReportRepository> =
	{
		create: jest.fn(),
		findById: jest.fn(),
		find: jest.fn(),
		findOne: jest.fn(),
		addReport: jest.fn(),
		cancelCheckHealth: jest.fn(),
	};
