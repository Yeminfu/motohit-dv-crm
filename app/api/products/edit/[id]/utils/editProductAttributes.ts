import dbWorker from "#db/dbWorker.ts";
import { ResultSetHeader } from "mysql2";
import getAttributeRelation from "./getAttributeRelation";

export default async function editProductAttributes(
  idProduct: number,
  attributes: {
    idAttribute: string;
    idAttributeValue: string;
  }[]
) {
  const errors = [];

  for (let index = 0; index < attributes.length; index++) {
    const newAttribute = attributes[index];

    const oldRelation = await getAttributeRelation(
      idProduct,
      Number(newAttribute.idAttribute)
    );

    const result = await updateAttrProdRelation(
      Number(newAttribute.idAttributeValue),
      oldRelation.id
    );

    if (result.affectedRows !== 1) {
      errors.push({ newAttribute, oldRelation, result });
    }
  }
}

async function updateAttrProdRelation(
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
