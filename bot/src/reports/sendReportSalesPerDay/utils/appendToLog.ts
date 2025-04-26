export default async function appendToLog(connection: any) {
  const sql = `
    insert into chbfs_reports_log
    (name)
    values
    ('salesReport')
  `;
  return await connection.query(sql)
}