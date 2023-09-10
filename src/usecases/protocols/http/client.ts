export interface Client {
  doRequest(
    url: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  ): Promise<any>;
}
