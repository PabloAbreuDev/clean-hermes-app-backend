import { comparePasswords, hashPassword } from "../bcrypt";

describe("Encrypt", () => {
  let password = "abcd";
  let saltRounds = 10;
  it("Should return a hashed string", async () => {
    const sut = await hashPassword(password, saltRounds);
    expect(typeof sut).toBe("string");
  });

  it("Should return true if encrypted pass is correct", async () => {
    const encrypted = await hashPassword(password, saltRounds);
    const sut = await comparePasswords(password, encrypted);
    expect(sut).toBeTruthy();
  });

  it("Should return false if encrypted pass is not valid", async () => {
    let encrypted = "";
    const sut = await comparePasswords(password, encrypted);
    expect(sut).toBeFalsy();
  });
});
