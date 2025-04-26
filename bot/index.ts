//@ts-nocheck
import mysql from 'mysql2/promise';
import 'dotenv/config';
import sendMessage from './src/telegramApi/sendMessage/sendMessage';
import fs from "fs";
import xlsx from 'node-xlsx';
import sendReportSalesPerDay from './src/reports/sendReportSalesPerDay/sendReportSalesPerDay';
import dayjs from 'dayjs';
import sendReportStock from './src/reports/sendReportStock/sendReportStock';
import checkTodayWasSendedSalesReport from './src/reports/sendReportSalesPerDay/utils/checkTodayWasSended';
import checkTodayWasSendedStockReport from './src/reports/sendReportStock/utils/checkTodayWasSended';

console.log('hello');
const token = process.env.TOKEN;
console.log(token);

(async function rec() {
  const nowHour = dayjs().format('HH');
  console.log(nowHour);

  if (nowHour !== '22') {
    return;
  }

  const salesReortWasSended = await checkTodayWasSendedSalesReport();
  // console.log(salesReortWasSended);


  const stockReportWasSended = await checkTodayWasSendedStockReport();
  // console.log(stockReportWasSended);

  if (!salesReortWasSended) {
    await sendReportSalesPerDay();
  }

  if (stockReportWasSended) {
    await sendReportStock();
  }
  await new Promise(r => {
    setTimeout(() => {
      r(1)
    }, 1000);
  });
  await rec();
  console.log('done');
  // checkTodayWasSended

})();
