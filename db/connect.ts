import mysql from "mysql2/promise";

// mysql -h 127.0.0.1 -P 3306 -u root -p

export default async function dbConnection() {
  return await mysql.createConnection({
    multipleStatements: true,
    host: process.env.DB_HOST || "localhost", // "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 100,
    maxIdle: 0,
    idleTimeout: 0,
    enableKeepAlive: false,
    waitForConnections: true,
    queueLimit: 0,
  });
}
