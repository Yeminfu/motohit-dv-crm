import ViewSQLResult from "#app/admin/sqlConsole/components/viewSQLResult/viewSQLResult.tsx";
import dbWorker from "#db/dbWorker2.ts";

export default async function Contrains() {
  const contrains = await getContrains();
  return (
    <>
      <ViewSQLResult SQLResult={contrains.result} />
      {/* <pre>{JSON.stringify(contrains, null, 2)}</pre> */}
    </>
  );
}

async function getContrains() {
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
