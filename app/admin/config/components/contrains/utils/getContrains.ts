import ts_constrainFromDB from "#app/admin/config/types/ts_constrainFromDB.js";
import dbWorker from "#db/dbWorker2.ts";

export default async function getContrains(
  tableName: string
): Promise<{ result?: ts_constrainFromDB[] }> {
  const sql = `
  select 
    CONSTRAINT_NAME, 
    TABLE_SCHEMA, 
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
