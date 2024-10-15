import mysql from 'mysql2';
// import "dotenv/config";


export default async function dbWorkerOldCRM(sql: string, params: any[]) {
    const db_connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: "motohit_27_crm",
        password: process.env.DB_PASSWORD,
    });

    const connection = db_connection;
    const res = await connection.promise().query(sql, params)
    connection.end()
    return res;
}