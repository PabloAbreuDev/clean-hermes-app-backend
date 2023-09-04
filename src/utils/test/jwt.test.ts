import jwt from "jsonwebtoken";
import { generateTokens, verifyToken } from "../jwt";

describe("Testando funções de geração e verificação de tokens", () => {
  const secret = "seu-segredo";
  const accessTokenExpiration = "1h";
  const refreshTokenExpiration = "7d";

  const payload = {
    userId: 123,
    username: "exemplo",
  };

  // Teste para a função generateTokens
  describe("generateTokens", () => {
    it("deve gerar tokens de acesso e atualização válidos", () => {
      const tokens = generateTokens(
        payload,
        secret,
        accessTokenExpiration,
        refreshTokenExpiration
      );

      // Verifique se os tokens foram gerados
      expect(tokens.accessToken).toBeDefined();
      expect(tokens.refreshToken).toBeDefined();

      // Verifique se os tokens são strings
      expect(typeof tokens.accessToken).toBe("string");
      expect(typeof tokens.refreshToken).toBe("string");

      // Decodifique e verifique o token de acesso
      const decodedAccessToken = jwt.verify(tokens.accessToken, secret) as {
        userId: number;
        username: string;
      };
      expect(decodedAccessToken.userId).toBe(payload.userId);
      expect(decodedAccessToken.username).toBe(payload.username);

      // Decodifique e verifique o token de atualização
      const decodedRefreshToken = jwt.verify(tokens.refreshToken, secret) as {
        userId: number;
        username: string;
      };
      expect(decodedRefreshToken.userId).toBe(payload.userId);
      expect(decodedRefreshToken.username).toBe(payload.username);
    });
  });

  // Teste para a função verifyToken
  describe("verifyToken", () => {
    it("deve verificar e decodificar um token válido", () => {
      const token = jwt.sign(payload, secret, { expiresIn: "1h" });

      const decodedToken = verifyToken(token, secret);

      expect(decodedToken.userId).toBe(payload.userId);
      expect(decodedToken.username).toBe(payload.username);
    });

    it("deve lançar um erro ao verificar um token inválido", () => {
      const token = "token-invalido";
    });
  });
});
