import { LoggerWithPino } from "../../infra/logger/logger-adapter"
import { SaveChatIdError } from "../errors/save-chat-error"
import { UserNotFoundError } from "../errors/user-not-found"
import { SaveUserChatId } from "../save-user-chatid"
import { mockUserRepository } from "./mocks/user-repository.mock"
import { mockedUser } from "./mocks/user.mock"

describe("Save user chat id", ()=>{
  it("Should save user chat id correctly", async ()=>{
    jest.spyOn(mockUserRepository, 'findByTelegramToken').mockResolvedValue(mockedUser)
    jest.spyOn(mockUserRepository, "saveChatId").mockResolvedValue({...mockedUser,telegramChatId:1})
    const saveUserChatId = new SaveUserChatId(mockUserRepository,new LoggerWithPino())
    const sut = await saveUserChatId.execute({chatId: 1,telegramToken: "123"})
    expect(sut).toStrictEqual({...mockedUser, telegramChatId:1})
    expect(mockUserRepository.findByTelegramToken).toBeCalled()
    expect(mockUserRepository.findByTelegramToken).toBeCalledWith("123"),
    expect(mockUserRepository.saveChatId).toBeCalled()
    expect(mockUserRepository.saveChatId).toBeCalledWith(mockedUser.id,1)
  })

  it('Should throw an error if user not found', async ()=>{
    jest.spyOn(mockUserRepository, 'findByTelegramToken').mockResolvedValue(null)
    const saveUserChatId = new SaveUserChatId(mockUserRepository,new LoggerWithPino())
    await expect(saveUserChatId.execute({chatId: 1,telegramToken: "123"})).rejects.toThrow(new UserNotFoundError())
  })

  it("Should throw an error if something went wrong on save chat id", async ()=>{
    jest.spyOn(mockUserRepository, 'findByTelegramToken').mockResolvedValue(mockedUser)
    jest.spyOn(mockUserRepository, "saveChatId").mockRejectedValue(new Error())
    const saveUserChatId = new SaveUserChatId(mockUserRepository,new LoggerWithPino())
    await expect(saveUserChatId.execute({chatId: 1,telegramToken: "123"})).rejects.toThrow(new SaveChatIdError())
  })
})