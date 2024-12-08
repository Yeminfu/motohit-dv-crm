import ts_attributesFromClient from "#app/api/products/edit/[id]/utils/editProductAttributes/ts_attributesFromClient.ts";
import dbWorker from "#db/dbWorker.ts";
import { ResultSetHeader } from "mysql2";

export default async function createAttributes(
  idProduct: number,
  attributes: ts_attributesFromClient[],
  idUser: number
): Promise<ResultSetHeader> {
  const sql = `
    insert into ${process.env.TABLE_PREFIX}_attr_prod_relation
    (
      idAttributeValue,
      idProduct,
      created_by
    )
    values
      ${attributes.map(() => "(?,?,?)")}
  `;

  const values = attributes
    .map((v) => [v.idAttributeValue, idProduct, idUser])
    .flat();

  const res = await dbWorker(sql, values);
  return res;
}
