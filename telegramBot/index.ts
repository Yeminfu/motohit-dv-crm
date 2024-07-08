import "dotenv/config";

const token = process.env.TELEGRAM_BOT_TOKEN;
// console.log("token", token);

let offset = 0;

async function getTelegramUpdates() {
  const response = await fetch(
    `https://api.telegram.org/bot${token}/getUpdates?offset=${offset}`
  );
  const data = await response.json();
  return data;
}

// Вызов функции для получения обновлений
getTelegramUpdates()
  .then((updates) => {
    console.log(JSON.stringify(updates, null, 2));
  })
  .catch((error) => {
    console.error("Ошибка при получении обновлений:", error);
  });

interface t_uodateResult {
  ok: boolean;
  result: {
    update_id: number;
    message: {
      message_id: 5742;
      from: {
        id: number;
        first_name: string;
        last_name: string;
        username: string;
      };
      text: string;
    };
  };
}
