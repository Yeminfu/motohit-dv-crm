export default async function checkTodayWasSended(connection: any) {
  const sql = `
  select * from chbfs_reports_log
  where
    name = 'salesReport' 
    and createdAt >= CURDATE()
    and createdAt < CURDATE() + INTERVAL 1 DAY
`;
  const result = await connection.query(sql).then((x: any[]) => x[0]);
  return Boolean(result.length);
}

