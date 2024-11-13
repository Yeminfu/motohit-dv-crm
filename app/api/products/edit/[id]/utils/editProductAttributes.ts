import dbWorker from "#db/dbWorker.ts";
import getAttributeByRelation from "./getAttributeByRelation";

export default async function editProductAttributes(
  idProduct: number,
  attributes: {
    idAttribute: string;
    idAttributeValue: string;
  }[]
) {
  for (let index = 0; index < attributes.length; index++) {
    const newAttribute = attributes[index];

    const relatedAttribute = await getAttributeByRelation(
      idProduct,
      Number(newAttribute.idAttributeValue)
    );

    if (relatedAttribute) {
      const result = await updateAttrProdRelation(
        Number(newAttribute.idAttributeValue),
        relatedAttribute.idRelation
      );
      // console.log("result", result);
      // break;
    } else {
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
  // console.log(sql, idAttributeValue, idRelation);

  return await dbWorker(sql, [idAttributeValue, idRelation]);
}
