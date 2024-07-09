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
          // console.log("update_id", message.update_id);
          // console.log("text", message.message.text);
          // console.log("username", message.message.from.username);
          // console.log("username", message.message.from.id);
          // console.log("message");

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
              // .then((response: any) => {
              //   console.log("send message response", response);
              // })
              // .catch((err) => {
              //   console.log("err #f9dxy", err);
              // });

              if (!user.tg_chat_id)
                await saveTgChatId(user.id, message.message.from.id);
            } else {
              console.log("отправляем, что я вас не знаю");
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
