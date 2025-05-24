//@ts-nocheck
import mysql from 'mysql2/promise';
import 'dotenv/config';
import sendMessage from './src/telegramApi/sendMessage/sendMessage';
import fs from "fs";
import xlsx from 'node-xlsx';
import sendReportSalesPerDay from './src/reports/sendReportSalesPerDay/sendReportSalesPerDay';
import dayjs from 'dayjs';
import sendReportStock from './src/reports/sendReportStock/sendReportStock';
import getLastSalesReport from './src/reports/sendReportSalesPerDay/utils/getLastSalesReport';
import getLastStockReport from './src/reports/sendReportStock/utils/getLastStockReport';

console.log('hello');
const token = process.env.TOKEN;
console.log(token);

(async function rec() {
  console.clear();
  const now = dayjs();//.format('HH');
  console.log(now, process.env.REPORTS_LOG_CHECK_HOUR);

  if (now.format('HH') !== process.env.REPORTS_LOG_CHECK_HOUR) {
    console.log('wrong time');
    await new Promise(r => {
      setTimeout(() => {
        r(1)
      }, 1000);
    });
    await rec();
    return;
  }

  console.log('good time');

  const lastSalesReport = await getLastSalesReport();
  console.log('lastSalesReport', lastSalesReport);
  // return;

  const lastStockReport = await getLastStockReport();

  if (!(lastSalesReport && now.format('DD.MM.YYYY HH') == lastSalesReport.time)) {
    console.log('отправляем отчет о продажах');
    await sendReportSalesPerDay();
  }

  if (!(lastStockReport && now.format('DD.MM.YYYY HH') == lastStockReport.time)) {
    await sendReportStock();
    console.log('отправляем отчет о складе');
  }

  console.log('пауза');

  await new Promise(r => {
    setTimeout(() => {
      r(1)
    }, 1000);
  });

  console.log('done');
  await rec();
  // checkTodayWasSended

})();
