//@ts-nocheck
import mysql from 'mysql2/promise';
import 'dotenv/config';
import sendMessage from './src/telegramApi/sendMessage/sendMessage';
import fs from "fs";
import xlsx from 'node-xlsx';


console.log('hello');
const token = process.env.TOKEN;
console.log(token);


// Пример использования функции
// const sampleData = [
//   { name: 'Зюзя', age: 30, city: 'New York' },
//   { name: 'Жужа', age: 25, city: 'Los Angeles' }
// ];

// // Замените 'CHAT_ID' на ID чата, куда хотите отправить файл
// createAndSendCSV(5050441344, sampleData);
// process.exit();
(async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  });

  const res = await getSales(connection);

  // console.log(res);

  // createAndSendCSV(5050441344, sampleData);

  if (!res.length) {
    sendMessage(Number(process.env.BOSS_CHAT_ID), "Сегодня не было продаж", String(token))
    return;
  }

  createAndSendCSV(Number(process.env.BOSS_CHAT_ID), res);

  await connection.end();
})()
// /home/zuacer/Desktop/work/motohit/crm-mif-bot/build/index.js





async function getSales(connection: any) {
  // const connection = await dbConnection();
  const qs = `
    select
      P.name as товар
      /*,P.idCategory idКатегории*/
      /*,S.idShop*/
      ,Sh.shopName as магазин
      ,sum(S.count) AS 'к-во'
      ,sum(S.sum) AS сумма
    from chbfs_sales S
      inner join chbfs_shops Sh on Sh.id = S.idShop
        inner join chbfs_products P on P.id = S.idProduct
          inner join chbfs_categories C on C.id = P.idCategory
    /*where S.created_date >= CURDATE()*/
      
    group by
      P.name 
      /*,P.idCategory*/
      ,S.idShop
      ,Sh.shopName
    order by магазин, товар
    limit 100;
  `;
  const res = await connection.query(qs)
    .then(([x]: any) => x)
  return res;
}





async function createAndSendCSV(chatId: number, data: any) {

  const arr = [
    Object.keys(data[0]),
    ...data.map(Object.values)
  ]

  console.log(data, arr);

  const sheetOptions = { '!cols': [{ wch: 6 }, { wch: 7 }, { wch: 10 }, { wch: 20 }] };

  var buffer = xlsx.build([{ name: 'mySheetName', data: arr }], { sheetOptions }); // Returns a buffer

  const filePath = 'output.xlsx';

  fs.writeFileSync(filePath, buffer, { encoding: "utf8" });


  const url = `https://api.telegram.org/bot${token}/sendDocument`;


  const readStream = fs.createReadStream(filePath);
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
    formData.append('document', new Blob([buffer]), 'file.xlsx');

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        console.log({ data });

        throw new Error(`Ошибка при отправке файла: ${response.body}`);
      }

      console.log('Файл успешно отправлен!');
    } catch (error) {
      console.error('Ошибка:', error);
    }
    // Теперь вы можете использовать buffer как аналог Blob
  });

  // Обработка ошибок
  readStream.on('error', (error) => {
    console.error('Ошибка при чтении файла:', error);
  });


}

