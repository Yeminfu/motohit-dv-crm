import dbWorker from "@/db/dbWorker2";

export default async function getProcedures(): Promise<{
  SPECIFIC_NAME: string,
  ROUTINE_DEFINITION: string
}[]> {
  const sqsl = `
    SELECT 
      SPECIFIC_NAME
      ,ROUTINE_DEFINITION
    FROM INFORMATION_SCHEMA.ROUTINES 
    WHERE ROUTINE_TYPE = 'PROCEDURE' 
      AND ROUTINE_SCHEMA = 'motohit_dv_crm';
  `;
  const res = await dbWorker(sqsl, []);
  return res.result;
}