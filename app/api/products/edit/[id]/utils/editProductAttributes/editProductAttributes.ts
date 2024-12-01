import getAttributeRelation from "./getAttributeRelation";
import updateAttrProdRelation from "../updateAttrProdRelation";
import removeRedundantRelations from "./removeRedundantRelations";
import createNewRelation from "./createNewRelation";
import ts_attributesFromClient from "./ts_attributesFromClient";

export default async function editProductAttributes(
  idProduct: number,
  attributes: ts_attributesFromClient[]
) {
  const errors = [];

  /**
   * удаляем связи, которые больше не нужны
   */
  const allRelations = await Promise.all(
    attributes.map(async (newAttribute) => {
      const relation = await getAttributeRelation(
        idProduct,
        Number(newAttribute.idAttribute)
      );
      return relation?.id;
    })
  ).then((x) => x);

  //@ts-ignore
  const relationsNumbersOnly: number[] = allRelations.filter(
    (x) => typeof x === "number"
  );

  const deleteResult = await removeRedundantRelations(idProduct, [
    ...relationsNumbersOnly,
    //массив не должен быть пустой, на всякий случай добавляем 0
    0,
  ]);

  for (let index = 0; index < attributes.length; index++) {
    const newAttribute = attributes[index];

    const oldRelation = await getAttributeRelation(
      idProduct,
      Number(newAttribute.idAttribute)
    );

    if (oldRelation) {
      //изменяем существующие связи
      const result = await updateAttrProdRelation(
        Number(newAttribute.idAttributeValue),
        oldRelation.id
      );
      if (result.affectedRows !== 1) {
        errors.push({ newAttribute, oldRelation, result });
      }
    } else {
      //создаем новые связи
    }
  }

  const createRelationResult = await createNewRelation(idProduct, attributes);
}
