import dbWorker from "#db/dbWorker2.ts";

export default async function getContrains() {
  const sql = `
  select 
  TABLE_SCHEMA, 
  CONSTRAINT_NAME, 
  TABLE_NAME, 
  CONSTRAINT_TYPE
  from 
    information_schema.TABLE_CONSTRAINTS 
  where
    TABLE_SCHEMA = 'motohit_dv_crm';
  `;
  return dbWorker(sql, []);
}
