import fs from "fs";
import xlsx from 'node-xlsx';
import dayjs from 'dayjs';
import deleteFile from "./deleteFile";

export default async function createAndSendXls(chatId: number, token: string, data: any) {
  const today = dayjs().format("DD-MM-YYYY");

  const fileName = `sales-${today}.xlsx`

  const arr = [
    Object.keys(data[0]),
    ...data.map(Object.values)
  ];

  // console.log(data, arr);

  const sheetOptions = { '!cols': [{ wch: 6 }, { wch: 7 }, { wch: 10 }, { wch: 20 }] };

  //@ts-ignore
  var buffer = xlsx.build([{ name: 'mySheetName', data: arr }], { sheetOptions }); // Returns a buffer

  // const filePath = 'output.xlsx';

  fs.writeFileSync(fileName, buffer, { encoding: "utf8" });


  const url = `https://api.telegram.org/bot${token}/sendDocument`;


  const readStream = fs.createReadStream(fileName);
  let chunks: any = [];

  // Сбор данных в Buffer
  readStream.on('data', (chunk) => {
    chunks.push(chunk);
  });

  readStream.on('end', async () => {
    // Объединение всех частей в один Buffer


    const formData = new FormData();

    formData.append('chat_id', String(chatId));

    const buffer = Buffer.concat(chunks);
    console.log('Buffer успешно создан:', buffer);
    // formData.append('document', fs.createReadStream(filePath));



    formData.append('document', new Blob([buffer]), fileName);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        // console.log({ data });

        throw new Error(`Ошибка при отправке файла: ${response.body}`);
      }

      console.log('Файл успешно отправлен!');
    } catch (error) {
      console.error('Ошибка:', error);
    }

    deleteFile(fileName);

    // Теперь вы можете использовать buffer как аналог Blob
  });

  // Обработка ошибок
  readStream.on('error', (error) => {
    console.error('Ошибка при чтении файла:', error);
  });


}

