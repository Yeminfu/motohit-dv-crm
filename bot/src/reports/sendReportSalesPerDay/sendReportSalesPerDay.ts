import "../../db/connect";
import mysql from 'mysql2/promise';

import sendMessage from "../../telegramApi/sendMessage/sendMessage";
import 'dotenv/config';
import getSales from "./utils/getSales";
import createAndSendXls from "./utils/createAndSendXls";

const token = process.env.TOKEN;

export default async function sendReportSalesPerDay() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  });

  const res = await getSales(connection);

  if (!res.length) {
    sendMessage(Number(process.env.BOSS_CHAT_ID), "Сегодня не было продаж", String(token))
    return;
  }

  createAndSendXls(Number(process.env.BOSS_CHAT_ID), String(token), res);

  await connection.end();
}










