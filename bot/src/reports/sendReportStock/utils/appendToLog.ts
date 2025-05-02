export default async function appendToLog(connection: any) {
  console.log('appendToLog begin');

  const sql = `
  insert into chbfs_reports_log
  (name)
  values
  ('stockReport')
  `;
  const result = await connection.query(sql);
  console.log(result);
  console.log('appendToLog end');
  return result;
}