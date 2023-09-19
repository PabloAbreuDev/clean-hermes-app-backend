import { UserNotFoundError } from "../errors/user-not-found"
import { GetCheckHealthReports } from "../get-check-health-reports"
import { mockCheckHealthRepository } from "./mocks/check-health-repository.mock"
import { mockUserRepository } from "./mocks/user-repository.mock"
import { mockedUser } from "./mocks/user.mock"

describe('Get check health report', ()=>{
  it("Should return a check health report propertly", async ()=>{
    jest.spyOn(mockUserRepository, "findById").mockResolvedValue(mockedUser)
    jest.spyOn(mockCheckHealthRepository, "find").mockResolvedValue([])
    const getCheckHealthReport = new GetCheckHealthReports(mockCheckHealthRepository,mockUserRepository)
    const sut = await getCheckHealthReport.execute({userId: mockedUser.id})
    expect(sut).toStrictEqual([])
    expect(mockCheckHealthRepository.find).toBeCalledTimes(1)
    expect(mockCheckHealthRepository.find).toBeCalledWith({userId: mockedUser.id})
    expect(mockUserRepository.findById).toBeCalledTimes(1)
    expect(mockUserRepository.findById).toBeCalledWith(mockedUser.id)
  })

  it("Should thrown an error if user not found", async ()=>{
    jest.spyOn(mockUserRepository, "findById").mockResolvedValue(null)
    const getCheckHealthReport = new GetCheckHealthReports(mockCheckHealthRepository,mockUserRepository)
    await expect(getCheckHealthReport.execute({
      userId: mockedUser.id
    })).rejects.toThrow(new UserNotFoundError())
  })
})