import jwt from "jsonwebtoken";

export function generateTokens(
  payload: any,
  secret: string,
  accessTokenExpiration: string,
  refreshTokenExpiration: string
): { accessToken: string; refreshToken: string } {
  const accessToken = jwt.sign(payload, secret, {
    expiresIn: accessTokenExpiration,
  });
  const refreshToken = jwt.sign(payload, secret, {
    expiresIn: refreshTokenExpiration,
  });

  return { accessToken, refreshToken };
}
export function verifyToken(token: string, secret: string): any {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
