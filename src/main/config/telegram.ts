import config from "config";
import Telebot from "telebot";
import TelegramBot from "node-telegram-bot-api";

const token = config.get("telegram.botToken") as string;

const bot = new TelegramBot(token, { polling: true });
