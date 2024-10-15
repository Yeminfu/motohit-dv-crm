import mysql from 'mysql2';

export default async function dbWorkerShop(sql: string, params: any[]) {
    const db_connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: "motohit_dv",
        password: process.env.DB_PASSWORD,
    });
    const connection = db_connection;
    const res = await connection.promise().query(sql, params)
    connection.end()
    return res;
}
