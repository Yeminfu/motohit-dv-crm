import "dotenv/config";
import t_uodateResult from "./types/t_uodateResult";
import getTelegramUpdates from "./utils/getTelegramUpdates";
// import dbConnection from "./utils/connect";
import getUserByTgUsername from "./utils/getUserByTgUsername";
import sendMessageToTelegram from "./utils/sendMessageToTelegram";
import saveTgChatId from "./utils/saveTgChatId";

const token = String(process.env.TELEGRAM_BOT_TOKEN);

let offset = 0;

(async function req() {
  await getTelegramUpdates(offset, token)
    .then(async (response: t_uodateResult) => {
      if (response.ok) {
        const updates = response.result;
        for (let index = 0; index < updates.length; index++) {
          const message = updates[index];

          if (message.message.text === "/start") {
            const user = await getUserByTgUsername(
              message.message.from.username
            );

            if (user) {
              await sendMessageToTelegram(
                token,
                message.message.from.id,
                `Здравствуйте, ${user.name}. Вы зарегистрированы.`
              );

              if (!user.tg_chat_id)
                await saveTgChatId(user.id, message.message.from.id);
            } else {
            }
          }

          offset = message.update_id + 1;
        }
      }
    })
    .catch((error) => {
      console.error("Ошибка при получении обновлений:", error);
    });
  await new Promise((r) => {
    setTimeout(() => {
      r(1);
    }, 1000);
  });
  await req();
})();
