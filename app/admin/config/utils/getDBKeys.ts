import dbWorker from "#db/dbWorker.ts";
import ts_keyFromDB from "../types/ts_keyFromDB";

export default async function getDBKeys(): Promise<ts_keyFromDB[]> {
  return dbWorker(
    `
      select 
        id,
        name,
        SQLString,
        description,
        idConfig,
        title,
        tableName
      from chbfs_sys$keys
    `,
    []
  );
}
