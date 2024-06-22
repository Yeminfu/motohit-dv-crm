import dbConnection from "@/db/connect";

const { TABLE_PREFIX } = process.env;

export default async function createUsersTable() {
  const connection = await dbConnection();
  await connection.query("SET FOREIGN_KEY_CHECKS=0;");
  await connection.query(`drop table if exists ${TABLE_PREFIX}_users`);
  await connection
    .query(
      `
        CREATE TABLE ${TABLE_PREFIX}_users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            is_active boolean DEFAULT 1,
            name varchar(255) UNIQUE,
            telegram_username  varchar(255) NOT NULL UNIQUE,
            tg_chat_id varchar(255) DEFAULT NULL UNIQUE,
            is_boss boolean DEFAULT 0
        );
    `
    )
    .then(([x]: any) => {
      console.log("createUsersTable", x.serverStatus);
    })
    .catch((z: any) => {
      console.log("createUsersTable", z);
    });
  await connection.query("SET FOREIGN_KEY_CHECKS=1;");
  await connection.end();
}
