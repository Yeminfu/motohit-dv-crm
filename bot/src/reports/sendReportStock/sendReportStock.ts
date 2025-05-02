import "../../db/connect";
import dayjs from 'dayjs';
import mysql from 'mysql2/promise';

import sendMessage from "../../telegramApi/sendMessage/sendMessage";
import 'dotenv/config';
import appendToLog from "./utils/appendToLog";
import createXls from "./utils/createXls";
import deleteFile from "./utils/deleteFile";
import getStock from "./utils/getStock";
import sendXls from "./utils/sendXls";

const token = process.env.TOKEN;

export default async function sendReportStock() {
  console.log('sendReportStock begin');

  const today = dayjs().format("DD-MM-YYYY");

  const pathToFile = process.env.PATH_TO_FILES + `/stock-${today}.xlsx`;

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  });

  const stockFromDb = await getStock(connection);

  if (!stockFromDb.length) {
    console.log('нет данных по складу');
    await sendMessage(Number(process.env.BOSS_CHAT_ID), "Ошибка формирования отчета о складе", String(token))
    await sendMessage(Number(process.env.SU_CHAT_ID), "Ошибка формирования отчета о складе", String(token))
  } else {
    console.log('есть данные по складу');
    const xlsBuffer = await createXls(pathToFile, stockFromDb);
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
    // await createAndSendXls(Number(process.env.BOSS_CHAT_ID), String(token), stockFromDb);
    // await createAndSendXls(Number(process.env.SU_CHAT_ID), String(token), stockFromDb);
  }

  await connection.end();
  console.log('sendReportStock end');
}


