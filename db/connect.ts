import mysql from "mysql2/promise";

export default async function dbConnection() {
  return await mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "xKd9kF2eA",
    database: "motohit_dv_crm",
  });
}

// export default dbCOnnection;
