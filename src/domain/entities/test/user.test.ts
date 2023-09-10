import { User } from "../user";

describe("User entity", () => {
  it("Should create a user correctly", () => {
    const dummyUser = {
      name: "John Doe",
      email: "johndoe@email.com",
      password: "12345",
      verifyCode: "12345",
      telegramToken: "123456",
      telegramChatId: 123,
      verified: false,
    };
    const user = new User(dummyUser);
    expect(user).toMatchObject(dummyUser);
  });

  it("Should thrown an error if name is invalid", () => {
    const dummyUser = {
      name: "J",
      email: "johndoe@email.com",
      password: "12345",
      verifyCode: "12345",
      telegramToken: "123456",
      telegramChatId: 123,
      verified: false,
    };
    expect(() => new User(dummyUser)).toThrow(
      new Error("You must enter a valid name")
    );
  });

  it("Should thrown an error if email is invalid", () => {
    const dummyUser = {
      name: "John Doe",
      email: "johndoeemail.com",
      password: "12345",
      verifyCode: "12345",
      telegramToken: "123456",
      telegramChatId: 123,
      verified: false,
    };
    expect(() => new User(dummyUser)).toThrow(
      new Error("You must enter a valid email")
    );
  });
});
