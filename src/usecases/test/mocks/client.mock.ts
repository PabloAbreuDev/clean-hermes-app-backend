import { Client } from "../../protocols/http/client";

export const mockClient : jest.Mocked<Client>= {
    doRequest: jest.fn()
}