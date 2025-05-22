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
  const nowHour = dayjs().format('HH');
  console.log(nowHour, process.env.REPORTS_LOG_CHECK_HOUR);

  if (nowHour !== process.env.REPORTS_LOG_CHECK_HOUR) {
    await new Promise(r => {
      r(1)
    })
    await rec();
    return;
  }

  const lastSalesReport = await getLastSalesReport();

  const lastStockReport = await getLastStockReport();

  if (!(lastSalesReport && nowHour == lastSalesReport.time)) {
    await sendReportSalesPerDay();
  }

  if (!(lastStockReport && nowHour == lastStockReport.time)) {
    await sendReportStock();
  }

  await new Promise(r => {
    setTimeout(() => {
      r(1)
    }, 10000);
  });
  await rec();

  console.log('done');
  // checkTodayWasSended

})();
