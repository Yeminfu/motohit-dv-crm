//@ts-nocheck
import mysql from 'mysql2/promise';
import 'dotenv/config';
import sendMessage from './src/telegramApi/sendMessage/sendMessage';
import fs from "fs";
import xlsx from 'node-xlsx';
import sendReportSalesPerDay from './src/reports/sendReportSalesPerDay/sendReportSalesPerDay';
import dayjs from 'dayjs';
import sendReportStock from './src/reports/sendReportStock/sendReportSalesPerDay';

console.log('hello');
const token = process.env.TOKEN;
console.log(token);

(async function rec() {
  const nowHour = dayjs().format('HH');
  console.log(nowHour);
  if (nowHour === '22') {
    await sendReportSalesPerDay();
    await sendReportStock();
  }


  await new Promise(r => {
    setTimeout(() => {
      r(1)
    }, 1000);
  });
  await rec();
  console.log('done');

})();
