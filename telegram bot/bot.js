const TelegramBot = require('node-telegram-bot-api');

// Вставь сюда свой токен от @BotFather
const TOKEN = '8168097040:AAHMLsaoSKw0VOPI48ZJfG3ibDQ8PLuaEnE';

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Открой магазин 👇", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🛍 Перейти в магазин",
            web_app: {
              url: "https://5eeee.github.io/telegram-webapp-shop/"
            }
          }
        ]
      ]
    }
  });
});