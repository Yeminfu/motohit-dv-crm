
export default async function sendMessage(chatId: number, message: string, token: string): Promise<boolean> {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  console.log(url);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    });

    // Проверка ответа
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const data = await response.json();
    if (data.ok) return true;
    console.log('Сообщение отправлено:', data);
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
  }
  return false;
}