//@ts-nocheck
import mysql from 'mysql2/promise';
import 'dotenv/config';
import sendMessage from './src/telegramApi/sendMessage/sendMessage';
import fs from "fs";
import xlsx from 'node-xlsx';
import sendReportSalesPerDay from './src/reports/sendReportSalesPerDay/sendReportSalesPerDay';


console.log('hello');
const token = process.env.TOKEN;
console.log(token);

sendReportSalesPerDay();

// Пример использования функции
// const sampleData = [
//   { name: 'Зюзя', age: 30, city: 'New York' },
//   { name: 'Жужа', age: 25, city: 'Los Angeles' }
// ];

// // Замените 'CHAT_ID' на ID чата, куда хотите отправить файл
// createAndSendCSV(5050441344, sampleData);
// process.exit();

// sendReportSalesPerDay();

// async function sendReportSalesPerDay() {
//   const connection = await mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//   });

//   const res = await getSales(connection);

//   // console.log(res);

//   // createAndSendCSV(5050441344, sampleData);

//   if (!res.length) {
//     sendMessage(Number(process.env.BOSS_CHAT_ID), "Сегодня не было продаж", String(token))
//     return;
//   }

//   createAndSendCSV(Number(process.env.BOSS_CHAT_ID), res);

//   await connection.end();
// }
// /home/zuacer/Desktop/work/motohit/crm-mif-bot/build/index.js




