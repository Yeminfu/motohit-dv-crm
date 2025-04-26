//@ts-nocheck
import mysql from 'mysql2/promise';
import 'dotenv/config';
import sendMessage from './src/telegramApi/sendMessage/sendMessage';
import fs from "fs";
import xlsx from 'node-xlsx';
import sendReportSalesPerDay from './src/reports/sendReportSalesPerDay/sendReportSalesPerDay';
import dayjs from 'dayjs';


console.log('hello');
const token = process.env.TOKEN;
console.log(token);

setInterval(() => {
  const nowHour = dayjs().format('HH');
  console.log(nowHour);
  if (nowHour === '16') {
    sendReportSalesPerDay();
  }
}, 1000);
