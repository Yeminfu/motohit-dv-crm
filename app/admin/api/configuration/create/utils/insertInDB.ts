import ts_config4create from "#app/admin/config/types/ts_config4create.ts";
import dbWorker from "#db/dbWorker2.ts";

export default async function insertInDB(data: ts_config4create) {
  const sql = `
    insert into chbfs_sys$config
    (name, title, description, idParent)
    values
    (?, ?, ?, ?)
  `;
  const res = await dbWorker(sql, [
    data.name,
    data.title,
    data.description,
    data.idParent || null,
  ]);
  return res;
}
