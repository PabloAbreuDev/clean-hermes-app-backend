import { CheckHealthReport } from "../../domain/entities/check-health-report"
import { CheckHealth } from "../check-health"
import { CheckHealthReportNotFoundError } from "../errors/check-health-not-found"
import { mockCheckHealthRepository } from "./mocks/check-health-repository.mock"
import { mockClient } from "./mocks/client.mock"

const mockedCheckHealth= {
    id: "1",
    urlToCheck: "http://localhost:3000",
    userId: "1",
    active: false,
    logs: [],
    createdAt: new Date(),
    updatedAt: new Date()
}

describe("Check Health", ()=>{
    it('Shuold do a request propertly', async ()=>{
        jest.spyOn(mockCheckHealthRepository, "findById").mockResolvedValue(mockedCheckHealth)

        const checkHealth = new CheckHealth(mockCheckHealthRepository,mockClient)
        const sut = await checkHealth.execute({
            checkHealthId: mockedCheckHealth.id,
            urlToCheck: mockedCheckHealth.urlToCheck
        })
        expect(mockCheckHealthRepository.findById).toBeCalledWith(mockedCheckHealth.id)
        expect(mockClient.doRequest).toBeCalledWith(mockedCheckHealth.urlToCheck, 'GET')
    })

    it('Should thrown an error if check health report is not found', async ()=>{
        jest.spyOn(mockCheckHealthRepository, "findById").mockResolvedValue(null)
        const checkHealth = new CheckHealth(mockCheckHealthRepository,mockClient)
        await expect(checkHealth.execute({
            checkHealthId: mockedCheckHealth.id,
            urlToCheck: mockedCheckHealth.urlToCheck
        })).rejects.toThrow(new CheckHealthReportNotFoundError())
    })
})