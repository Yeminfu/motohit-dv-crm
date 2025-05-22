export default async function sendXls(tgChatId: number, pathToFile: string, buffer: Buffer, token: string) {
  console.log('sendXls begin');

  const url = `https://api.telegram.org/bot${token}/sendDocument`;

  const formData = new FormData();

  formData.append('chat_id', String(tgChatId));

  formData.append('document', new Blob([buffer]), pathToFile);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    console.log(response.status);

    if (!response.ok) {
      throw new Error(`Ошибка при отправке файла: ${response.body}`);
    }

    const data = await response.json();

    return data.ok;

  } catch (error) {
    console.error('Ошибка #kfsmf094:', error);
  }

  console.log('sendXls end');
  return false;
}
