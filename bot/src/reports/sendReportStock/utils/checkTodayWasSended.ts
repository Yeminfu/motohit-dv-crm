import mysql from 'mysql2/promise';

export default async function checkTodayWasSended() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  });
  const sql = `
  select * from chbfs_reports_log
  where
    name = 'stockReport' 
    and createdAt >= CURDATE()
    and createdAt < CURDATE() + INTERVAL 1 DAY
`;
  const result = await connection.query(sql).then((x: any[]) => x[0]);
  await connection.end();

  return Boolean(result.length);
}

