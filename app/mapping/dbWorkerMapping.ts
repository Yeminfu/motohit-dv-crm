import mysql from 'mysql2';

export default async function dbWorkerMapping(sql: string, params: any[]) {
    try {
        const db_connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: "motohit_dv_mapping",
            password: process.env.DB_PASSWORD,
        })
        const connection = db_connection;
        const res = await connection.promise().query(sql, params)
        connection.end()
        return res;
    } catch (error) {
        console.log('error #dmdn4j4', error);
    }
}
