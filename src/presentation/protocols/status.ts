import { HttpResponse } from "./http";

export const ok = (data: Record<string, any>): HttpResponse => ({
  body: data,
  statusCode: 200,
});

export const created = (data: Record<string, any>): HttpResponse => ({
  body: data,
  statusCode: 201,
});

export const serverError = (data: Record<string, any>): HttpResponse => ({
  body: data,
  statusCode: 500,
});
