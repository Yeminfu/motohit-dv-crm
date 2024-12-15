import ts_class4create from "../types/ts_class4create";
import dbWorker2 from "#db/dbWorker2.ts";

export default async function insertClassToDB(_class: ts_class4create) {
  const res = await dbWorker2(
    `call createClass(
      ?,
      @val
  )`,
    [_class.className]
  );

  return res;
}
