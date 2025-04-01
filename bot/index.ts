import mysql from 'mysql2/promise';
import 'dotenv/config';
import sendMessage from './src/telegramApi/sendMessage/sendMessage';

console.log('hello');
const token = process.env.TOKEN;
console.log(token);


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

  console.log('csvRows', csvRows.join('\n'));


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
    select * from chbfs_users
  `;
  const res = await connection.query(qs)
    .then(([x]: any) => x)
  // .then(x => x[0]);
  // await connection.end();
  return res;
}