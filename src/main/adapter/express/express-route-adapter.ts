import { Request, Response } from "express";
import { Controller, HttpRequest } from "../../../controllers/ports/http";

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
    };
    const httpResponse = await controller.handle(httpRequest);
    if (httpResponse.statusCode >= 400) {
      res.status(httpResponse.statusCode).json(httpResponse.body.message);
    } else {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    }
  };
};