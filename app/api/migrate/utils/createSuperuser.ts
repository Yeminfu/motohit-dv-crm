import dbConnection from "@/db/connect";

const { TABLE_PREFIX } = process.env;

export default async function createSuperuser() {
    const connection = await dbConnection();
    await connection.query(
      `insert into ${TABLE_PREFIX}_users (name, telegram_username, tg_chat_id, is_boss) values ('superuser', ?, ?, 1)`,
      [
        process.env.SUPERUSER_TELEGRAM_USSERNAME,
        process.env.SUPERUSER_TELEGRAM_CHAT_ID,
      ]
    );
    await connection.end();
  }
  