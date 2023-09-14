import config from "config";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const secret = config.get("jwt.secret") as string;

function jwtAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
): void | Response<any, Record<string, any>> {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    const decoded = jwt.verify(token, secret) as { id: string };

    req.userId = decoded.id;

    // (req as any).userId = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid authorization token" });
  }
}

export { jwtAuthentication };
