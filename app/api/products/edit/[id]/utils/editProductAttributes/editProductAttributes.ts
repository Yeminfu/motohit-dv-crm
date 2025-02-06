import getAttributeRelation from "./getAttributeRelation";
import updateAttrProdRelation from "../updateAttrProdRelation";
import removeRedundantRelations from "./removeRedundantRelations";
import ts_attributesFromClient from "./ts_attributesFromClient";

export default async function editProductAttributes(
  connection: any,
  idProduct: number,
  attributes: ts_attributesFromClient[]
) {
  if (!attributes.length) return;

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


  await removeRedundantRelations(connection, idProduct, [
    ...relationsNumbersOnly,
    //массив не должен быть пустой, на всякий случай добавляем 0
    0,
  ]);

  for (let index = 0; index < attributes.length; index++) {
    const newAttribute = attributes[index];

    await updateAttrProdRelation(
      connection,
      idProduct,
      Number(newAttribute.idAttributeValue),
    );
  }

}
