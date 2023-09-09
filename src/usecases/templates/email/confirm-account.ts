import config from "config";

export const confirmAccountTemplate = (verifyCode: string) => {
  return `<!DOCTYPE html>
<html>
<head>
    <title>Bem-vindo ao Hermes App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #007bff;
            text-align: center;
        }
        p {
            text-align: center;
            font-size: 18px;
            margin-bottom: 30px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Bem-vindo ao Hermes App!</h1>
        <p>Estamos emocionados por tê-lo como parte da nossa comunidade. Para começar a usar nossa plataforma, por favor, verifique sua conta:</p>
        <a href="${config.get(
          "baseurl"
        )}/users/${verifyCode}" class="button">Verificar Conta</a>
    </div>
</body>
</html>
`;
};
