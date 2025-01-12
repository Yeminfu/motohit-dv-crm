import dbWorker from "#db/dbWorker2.ts";

export default async function getColumns(
  tableName: string,
  contrainName: string
): Promise<{
  result?: {
    CONSTRAINT_NAME: string;
    TABLE_NAME: string;
    CONSTRAINT_TYPE: string;
    COLUMN_NAME: string;
  }[];
  error?: any;
}> {
  const sql = `
    select 
      contrains.CONSTRAINT_NAME, 
      contrains.TABLE_NAME, 
      contrains.CONSTRAINT_TYPE,
      cols.COLUMN_NAME
    from information_schema.TABLE_CONSTRAINTS as contrains
      left join information_schema.KEY_COLUMN_USAGE as cols
      on
        cols.TABLE_NAME = contrains.TABLE_NAME
        and cols.CONSTRAINT_NAME = contrains.CONSTRAINT_NAME
    where
      contrains.TABLE_NAME = ?
      and contrains.CONSTRAINT_NAME = ?
  `;
  const res = await dbWorker(sql, [tableName, contrainName]);
  return res;
}
