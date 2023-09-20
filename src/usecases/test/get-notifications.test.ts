import { UserNotFoundError } from "../errors/user-not-found"
import { GetNotifications } from "../get-notificationts"
import { mockNotificationRepository } from "./mocks/notification-repository.mock"
import { mockUserRepository } from "./mocks/user-repository.mock"
import { mockedUser } from "./mocks/user.mock"

describe('Get notifications', ()=>{
  it("Should return notifications", async ()=>{
    jest.spyOn(mockUserRepository, "findById").mockResolvedValue(mockedUser)
    jest.spyOn(mockNotificationRepository, "find").mockResolvedValue([])
    const getNotifications = new GetNotifications(mockNotificationRepository,mockUserRepository)
    const sut = await getNotifications.execute({userId: mockedUser.id})
    expect(sut).toStrictEqual([])
    expect(mockUserRepository.findById).toBeCalledTimes(1)
    expect(mockUserRepository.findById).toBeCalledWith(mockedUser.id)
    expect(mockNotificationRepository.find).toBeCalledTimes(1)
    expect(mockNotificationRepository.find).toBeCalledWith({userId: mockedUser.id})
  })

  it("Should thrown error if user not found", async ()=>{
    jest.spyOn(mockUserRepository, "findById").mockResolvedValue(null)
    const getNotifications = new GetNotifications(mockNotificationRepository,mockUserRepository)
    await expect(getNotifications.execute({userId: mockedUser.id})).rejects.toThrow(new UserNotFoundError())
  })
})