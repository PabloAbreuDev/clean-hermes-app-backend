import { Encrypter } from "../../protocols/crypto/encrypter";

export const mockEncrypter: jest.Mocked<Encrypter> = {
  encrypt: jest.fn(),
};
