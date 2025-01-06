import dbWorker from "#db/dbWorker2.ts";

export default async function getViews() {
  return dbWorker(`select * from chbfs_sys$views`, []);
}
