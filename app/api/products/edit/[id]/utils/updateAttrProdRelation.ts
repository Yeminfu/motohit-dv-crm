import dbWorker from "#db/dbWorker.ts";
import { ResultSetHeader } from "mysql2";

export default async function updateAttrProdRelation(
  idAttributeValue: number,
  idRelation: number
) {
  const sql = `
    update chbfs_attr_prod_relation
    set
      idAttributeValue = ?
    where
      id = ?
  `;

  const res: ResultSetHeader = await dbWorker(sql, [
    idAttributeValue,
    idRelation,
  ]);
  return res;
}
