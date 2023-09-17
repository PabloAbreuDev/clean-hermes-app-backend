import { HashComparer } from "../../protocols/crypto/hash-comparer";

export const mockHashComparer: jest.Mocked<HashComparer> = {
  compare: jest.fn(),
};
