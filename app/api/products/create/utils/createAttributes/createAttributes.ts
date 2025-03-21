import ts_attributesFromClient from "#app/api/products/edit/[id]/utils/editProductAttributes/ts_attributesFromClient.ts";
import { ResultSetHeader } from "mysql2";

export default async function createAttributes(
  connection: any,
  idProduct: number,
  attributes: ts_attributesFromClient[],
  idUser: number
): Promise<ResultSetHeader[]> {
  const results = [];

  for (let index = 0; index < attributes.length; index++) {
    const v = attributes[index];
    const sql = `call createAttrProdRelation(?,?,?)`;
    const res = await connection.query(sql, [v.idAttributeValue, idProduct, idUser]);
    results.push(res);
  }

  return results;
}
