import dbWorker from "#db/dbWorker.ts";

export default async function getDBTables(): Promise<
  { Tables_in_motohit_dv_crm: string }[]
> {
  return dbWorker(`show tables`, []);
}
