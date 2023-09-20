import { BCryptAdapter } from "../../infra/cryptography/bcrypt-adapter"
import { LoggerWithPino } from "../../infra/logger/logger-adapter"
import { RegisterUserError } from "../errors/register-user-error"
import { UserAlreadyExistsError } from "../errors/user-already-exists"
import { RegisterUser } from "../register-user"
import { mockEmailService } from "./mocks/email-service.mock"
import { mockUserRepository } from "./mocks/user-repository.mock"
import { mockedUser } from "./mocks/user.mock"

describe('Register user', ()=>{
  it("Should register a user", async ()=>{
    jest.spyOn(mockUserRepository, "findByEmail").mockResolvedValue(null)
    jest.spyOn(mockUserRepository, "create").mockResolvedValue(mockedUser)
    const registerUser = new RegisterUser(mockUserRepository,mockEmailService,new LoggerWithPino(),new BCryptAdapter(12))
    const sut = await registerUser.execute({
      email: mockedUser.email,
      name: mockedUser.name,
      password: "12345"
    })
    expect(sut).toMatchObject(mockedUser)
    expect(mockUserRepository.findByEmail).toBeCalledTimes(1)
    expect(mockUserRepository.findByEmail).toBeCalledWith(mockedUser.email)
    expect(mockUserRepository.create).toBeCalledTimes(1)
    expect(mockEmailService.send).toBeCalledTimes(1)
  })

  it("Should throw an error if user exists", async ()=>{
    jest.spyOn(mockUserRepository, "findByEmail").mockResolvedValue(mockedUser)
    const registerUser = new RegisterUser(mockUserRepository,mockEmailService,new LoggerWithPino(),new BCryptAdapter(12))
    await expect(registerUser.execute({email: mockedUser.email,
      name: mockedUser.name,
      password: "12345" })).rejects.toThrow(new UserAlreadyExistsError())
  })

  it("Should throw an error if something went wrong on create user entity", async ()=>{
    jest.spyOn(mockUserRepository, "findByEmail").mockResolvedValue(null)
    const registerUser = new RegisterUser(mockUserRepository,mockEmailService,new LoggerWithPino(),new BCryptAdapter(12))
    await expect(registerUser.execute({
      email: "",
      name: mockedUser.name,
      password: "12345"
    })).rejects.toThrow(new RegisterUserError())
  })

  it("Should throw an error if something went wrong on repository user create", async ()=>{
    jest.spyOn(mockUserRepository, "findByEmail").mockResolvedValue(null)
    jest.spyOn(mockUserRepository, "create").mockRejectedValue(new Error())
    const registerUser = new RegisterUser(mockUserRepository,mockEmailService,new LoggerWithPino(),new BCryptAdapter(12))
    await expect(registerUser.execute({
      email: mockedUser.email,
      name: mockedUser.name,
      password: "12345"
    })).rejects.toThrow(new RegisterUserError())

  })
})