import dbWorker from "#db/dbWorker2.ts";

export default async function getContrains(tableName: string) {
  const sql = `
  select 
  TABLE_SCHEMA, 
  CONSTRAINT_NAME, 
  TABLE_NAME, 
  CONSTRAINT_TYPE
  from 
    information_schema.TABLE_CONSTRAINTS 
  where
    TABLE_SCHEMA = 'motohit_dv_crm'
    and TABLE_NAME=?;
  `;
  return dbWorker(sql, [tableName]);
}
