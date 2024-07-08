export default async function getTelegramUpdates(
  offset: number,
  token: string
) {
  const response = await fetch(
    `https://api.telegram.org/bot${token}/getUpdates?offset=${offset}`
  );
  const data = await response.json();
  return data;
}
