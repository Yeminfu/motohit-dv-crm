import mysql from "mysql2/promise";

export default async function dbConnection() {
  return await mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}
