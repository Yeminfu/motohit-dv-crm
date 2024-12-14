import dbWorker from "#db/dbWorker.ts";
import { ResultSetHeader } from "mysql2";
import ts_class4delete from "../types/ts_class4delete";

export default async function deleteClassFromDB(
  _class: ts_class4delete
): Promise<ResultSetHeader> {
  const res = await dbWorker(
    `
    delete from chbfs_sys$classes
    where
      id = ?
  `,
    [_class.idClass]
  );
  return res;
}
