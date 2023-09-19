import config from "config"
import { GenerateTelegramURLController } from "../../presentation/controllers/user/generate-telegram-url.controller"
import { GenerateTelegramUrl } from "../generate-telegram-url"
import { mockUserRepository } from "./mocks/user-repository.mock"
import { mockedUser } from "./mocks/user.mock"
import { UserNotFoundError } from "../errors/user-not-found"

describe("Generate telegram url", ()=>{
  it('Should generate a telegram url propertly', async ()=>{
    jest.spyOn(mockUserRepository,"findById").mockResolvedValue({...mockedUser, telegramToken:"abc"})
    const generateTelegramUrl = new GenerateTelegramUrl(mockUserRepository)
    const sut = await generateTelegramUrl.execute({userId: mockedUser.id})
    expect(sut).toBe(`https://www.telegram.me/${config.get("telegram.botName")}?start=abc`)
    expect(mockUserRepository.findById).toBeCalledTimes(1)    
    expect(mockUserRepository.findById).toBeCalledWith(mockedUser.id)
  })

  it("Should thrown an error if user not found", async ()=>{
    jest.spyOn(mockUserRepository,"findById").mockResolvedValue(null)
    const generateTelegramUrl = new GenerateTelegramUrl(mockUserRepository)

    await expect(generateTelegramUrl.execute({
      userId: mockedUser.id
      })).rejects.toThrow(new UserNotFoundError())
    })
})