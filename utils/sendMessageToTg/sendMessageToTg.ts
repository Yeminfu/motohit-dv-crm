export default async function sendMessageToTg(
  telegramChatId: number,
  message: string
) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    body: JSON.stringify({
      chat_id: telegramChatId,
      text: "CRM МотоХит-ДВ" + "\n" + message,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }
      return response.json();
    })
    .then((x) => {
      return x;
    })
    .catch((err) => {
      console.log("err #f9f8023", err);
    });
}
