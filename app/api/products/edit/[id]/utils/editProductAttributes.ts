import getAttributeRelation from "./getAttributeRelation";
import updateAttrProdRelation from "./updateAttrProdRelation";

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
