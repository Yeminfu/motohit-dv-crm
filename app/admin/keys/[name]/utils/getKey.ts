import ts_keyFromDB from "#app/admin/config/types/ts_keyFromDB.js";
import dbWorker from "#db/dbWorker2.ts";

export default async function getKey(
  keyName: string
): Promise<ts_keyFromDB | undefined> {
  const res = await dbWorker(
    `
    select
      *
    from chbfs_sys$keys
    where
      name = ?
  `,
    [keyName]
  );

  const keyItem = res.result?.pop();

  if (keyItem) return keyItem;

  return;
}
