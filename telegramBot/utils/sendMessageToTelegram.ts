export default async function sendMessageToTelegram(
  token: string,
  idChat: number,
  message: string
) {
  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage?chat_id=${idChat}&text=${message}`
  );
  const data = await response.json();
  return data;
}
