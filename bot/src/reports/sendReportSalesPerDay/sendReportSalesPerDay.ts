import "../../db/connect";
import mysql from 'mysql2/promise';

import sendMessage from "../../telegramApi/sendMessage/sendMessage";
import 'dotenv/config';
import getSales from "./utils/getSales";
import createAndSendXls from "./utils/createAndSendXls";
import appendToLog from "./utils/appendToLog";

const token = process.env.TOKEN;

export default async function sendReportSalesPerDay() {
  console.log('sendReportSalesPerDay');

  // return;

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  });

  // const todayWasSended = await checkTodayWasSended();
  // console.log({ todayWasSended });

  // if (todayWasSended) {
  //   await connection.end();
  //   return
  // }

  const res = await getSales(connection);

  if (!res.length) {
    // sendMessage(Number(process.env.BOSS_CHAT_ID), "Сегодня не было продаж", String(token))
    const success = await sendMessage(Number(process.env.SU_CHAT_ID), "Сегодня не было продаж", String(token));
    if (success) await appendToLog(connection);;
  } else {
    // createAndSendXls(Number(process.env.BOSS_CHAT_ID), String(token), res);
    const success = await createAndSendXls(Number(process.env.SU_CHAT_ID), String(token), res);
    if (success) await appendToLog(connection);;
  }

  await connection.end();
}
