import dbWorker from "#db/dbWorker.ts";
import ts_class4create from "../types/ts_class4create";

export default async function insertClassToDB(_class: ts_class4create) {
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
