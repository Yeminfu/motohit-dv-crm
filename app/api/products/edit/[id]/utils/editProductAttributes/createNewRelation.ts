import dbWorker from "@/db/dbWorker2";
import ts_attributesFromClient from "./ts_attributesFromClient";

export default async function createNewRelation(
  connection: any,
  idProduct: number,
  attributes: ts_attributesFromClient[]
) {
  const sql = `
    insert into chbfs_attr_prod_relation
    (
      created_by,
      idAttributeValue,
      idProduct 
    )
    values
      ${attributes.map(() => `(?,?,?)`).join(",\n      ")}
  `;

  const res = await connection.query(
    sql,
    attributes.map((el) => [1, el.idAttributeValue, idProduct]).flat()
  );

  return res;
}
