import "../../db/connect";
import mysql from 'mysql2/promise';

import sendMessage from "../../telegramApi/sendMessage/sendMessage";
import 'dotenv/config';
import checkTodayWasSended from "./utils/checkTodayWasSended";
import appendToLog from "./utils/appendToLog";
import getStock from "./utils/getStock";
import createAndSendXls from "./utils/createAndSendXls";
// import getSales from "./utils/getSales";
// import createAndSendXls from "./utils/createAndSendXls";
// import checkTodayWasSended from "./utils/checkTodayWasSended";
// import appendToLog from "./utils/appendToLog";

const token = process.env.TOKEN;

export default async function sendReportStock() {
  console.log('sendReportStock');

  // return;

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  });

  const todayWasSended = await checkTodayWasSended(connection);
  // console.log({ todayWasSended });

  if (todayWasSended) {
    await connection.end();
    return
  }

  const res = await getStock(connection);

  if (!res.length) {
    sendMessage(Number(process.env.BOSS_CHAT_ID), "Ошибка формирования отчета о складе", String(token))
    sendMessage(Number(process.env.SU_CHAT_ID), "Ошибка формирования отчета о складе", String(token))
  } else {
    createAndSendXls(Number(process.env.BOSS_CHAT_ID), String(token), res);
    createAndSendXls(Number(process.env.SU_CHAT_ID), String(token), res);
  }

  await appendToLog(connection);

  await connection.end();
}


