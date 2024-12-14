import dbWorker from "#db/dbWorker.ts";
import { ResultSetHeader } from "mysql2";
import ts_class4create from "../types/ts_class4create";

export default async function insertClassToDB(
  _class: ts_class4create
): Promise<ResultSetHeader> {
  const res = await dbWorker(
    `
      insert into chbfs_sys$classes
      (className)
      values
      (?)
    `,
    [_class.className]
  );
  return res;
}
