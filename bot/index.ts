import mysql from 'mysql2/promise';
import 'dotenv/config';
import sendMessage from './src/telegramApi/sendMessage/sendMessage';
import fs from "fs";

console.log('hello');
const token = process.env.TOKEN;
console.log(token);


// Пример использования функции
// const sampleData = [
//   { name: 'Alice', age: 30, city: 'New York' },
//   { name: 'Bob', age: 25, city: 'Los Angeles' }
// ];

// // Замените 'CHAT_ID' на ID чата, куда хотите отправить файл
// createAndSendCSV(5050441344, sampleData);

(async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  });

  const res = await getSales(connection);

  console.log(res);


  const csvRows = [];
  const headers = Object.keys(res[0]);
  csvRows.push(headers.join(',')); // Добавляем заголовки

  for (const row of res) {
    const values = headers.map(header => {
      const escaped = ('' + row[header]).replace(/"/g, '\\"'); // Экранируем кавычки
      return `"${escaped}"`; // Оборачиваем значения в кавычки
    });
    csvRows.push(values.join(','));
  }

  // console.log('csvRows', csvRows.join('\n'));


  createAndSendCSV(5050441344, res);


  // const json = JSON.stringify(res, null, 2);

  // sendMessage(5050441344, json, String(token))

  // console.log(res);


  await connection.end();
  return;

  try {
    // Выполнение запроса
    const [rows, fields] = await connection.execute('show tables');
    // sendMessage(5050441344, "manamana", String(token))

    // return;
    // Вывод результатовq
    console.log(rows);
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
  } finally {
    // Закрытие подключения
    await connection.end();
  }

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
    where S.created_date >= CURDATE()
      
    group by
      P.name 
      /*,P.idCategory*/
      ,S.idShop
      ,Sh.shopName
    order by магазин, товар;
  `;
  const res = await connection.query(qs)
    .then(([x]: any) => x)
  // .then(x => x[0]);
  // await connection.end();
  return res;
}





async function createAndSendCSV(chatId: number, data: any) {
  // Создаем CSV строку
  const csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(',')); // Добавляем заголовки

  for (const row of data) {
    const values = headers.map(header => {
      const escaped = ('' + row[header]).replace(/"/g, '\\"'); // Экранируем кавычки
      return `"${escaped}"`; // Оборачиваем значения в кавычки
    });
    csvRows.push(values.join(','));
  }

  const csvString = csvRows.join('\n');
  const filePath = 'output.csv';

  // Записываем CSV в файл
  fs.writeFileSync(filePath, csvString);

  // Отправляем файл пользователю Telegram
  // const token = 'YOUR_TELEGRAM_BOT_TOKEN'; // Замените на ваш токен
  const url = `https://api.telegram.org/bot${token}/sendDocument`;

  const formData = new FormData();
  formData.append('chat_id', String(chatId));

  // new Blob([data]), 'file.txt')

  // fs.creaeteReadStream(fileePath)

  const readStream = fs.createReadStream(filePath);
  let chunks: any = [];

  // Сбор данных в Buffer
  readStream.on('data', (chunk) => {
    chunks.push(chunk);
  });

  readStream.on('end', () => {
    // Объединение всех частей в один Buffer
    const buffer = Buffer.concat(chunks);
    console.log('Buffer успешно создан:', buffer);

    // Теперь вы можете использовать buffer как аналог Blob
  });

  // Обработка ошибок
  readStream.on('error', (error) => {
    console.error('Ошибка при чтении файла:', error);
  });

  formData.append('document', new Blob([csvString]), 'file.csv');

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData
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
}

