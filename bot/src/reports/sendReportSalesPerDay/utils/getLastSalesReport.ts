import mysql from 'mysql2/promise';

export default async function getLastSalesReport(): Promise<{ id: number, name: string, createdAt: Date }> {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  });
  const sql = `select date_format(createdAt, '%d.%m.%Y %H') as time from chbfs_reports_log where name = 'salesReport' order by id desc limit 1`;
  const result = await connection.query(sql).then((x: any[]) => x[0]).then((x: any[]) => x[0]);
  await connection.end();
  return result;
}
