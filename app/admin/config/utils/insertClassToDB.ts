import ts_class4create from "../types/ts_class4create";
import dbWorker2 from "@/db/dbWorker2";

export default async function insertClassToDB(_class: ts_class4create) {
  const res = await dbWorker2(
    `call createClass(
      ?,
      ?,
      ?,
      ?
  )`,
    [_class.className, _class.title, _class.description, _class.idConfig]
  );

  return res;
}
