import { Client } from "../../usecases/protocols/http/client";
import axios, { AxiosResponse } from "axios";

export class ClientAxios implements Client {
  async doRequest(
    url: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  ): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios({ method, url });
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Error making ${method} request to ${url}: ${error.message}`
      );
    }
  }
}
