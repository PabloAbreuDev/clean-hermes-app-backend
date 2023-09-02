import config from "config";
import Logger from "../../../utils/logger";
import telebot from "telebot";
import { makeSaveUserChatId } from "../../../main/factories/save-user-chat-id";

export const initializeBot = () => {
  const token = config.get("telegram.botToken") as string;

  const bot = new telebot({
    token,
    polling: {
      interval: 1000,
      timeout: 0,
      limit: 100,
      retryTimeout: 5000,
    },
  });

  bot.on(["/start", "/hello"], async (msg) => {
    const message = msg.text.split(" ");
    const token = message[1];
    if (token) {
      const useCase = makeSaveUserChatId();
      await useCase.execute({ telegramToken: token, chatId: msg.chat.id });
    }

    msg.reply.text("Welcome to hermes app!");
  });

  bot.start();

  Logger.info("Telegram bot is running");
};

export default initializeBot;
