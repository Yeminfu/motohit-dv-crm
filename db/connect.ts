import mysql from "mysql2/promise";

export default async function dbConnection() {
  return await mysql.createConnection({
    multipleStatements: true,
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 2,
    maxIdle: 0,
    idleTimeout: 0,
    enableKeepAlive: false,
    waitForConnections: true,
    queueLimit: 0,
  });
}
