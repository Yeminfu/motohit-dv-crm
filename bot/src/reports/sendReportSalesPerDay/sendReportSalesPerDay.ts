import "../../db/connect";
import mysql from 'mysql2/promise';

import sendMessage from "../../telegramApi/sendMessage/sendMessage";
import 'dotenv/config';
import getSales from "./utils/getSales";
import createAndSendXls from "./utils/createAndSendXls";
import appendToLog from "./utils/appendToLog";
import dayjs from "dayjs";
import createXls from "../sendReportStock/utils/createXls";
import sendXls from "../sendReportStock/utils/sendXls";
import deleteFile from "./utils/deleteFile";

const token = process.env.TOKEN;

export default async function sendReportSalesPerDay() {
  console.log('sendReportSalesPerDay');

  const today = dayjs().format("DD-MM-YYYY");

  const pathToFile = process.env.PATH_TO_FILES + `/sales-${today}.xlsx`;

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  });

  const salesFromDb = await getSales(connection);

  if (!salesFromDb.length) {
    const success = await sendMessage(Number(process.env.SU_CHAT_ID), "Сегодня не было продаж", String(token));
    await sendMessage(Number(process.env.BOSS_CHAT_ID), "Сегодня не было продаж", String(token));
    if (success) await appendToLog(connection);;
  } else {
    const xlsBuffer = await createXls(pathToFile, salesFromDb);
    if (!xlsBuffer) {
      // sendMessage(Number(process.env.SU_CHAT_ID), "Ошибка формирования отчета о складе", String(token))
      console.log('ошибка создания xls файла');
      await connection.end();
      return;
    }

    const success =
      await sendXls(Number(process.env.BOSS_CHAT_ID), pathToFile, xlsBuffer, String(token))
    await sendXls(Number(process.env.SU_CHAT_ID), pathToFile, xlsBuffer, String(token))

    if (success) {
      console.log('файл успешно отправлен');
      await appendToLog(connection);
    } else {
      console.log('ошибка отправки файла');
    }


    deleteFile(pathToFile);

    console.log({ xlsBuffer });

  }

  await connection.end();
}
