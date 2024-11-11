import dbWorker from "#db/dbWorker.ts";
import checkRelationIsExists from "./checkRelationIsExists";

export default async function editProductAttributes(
  idProduct: number,
  attributes: {
    idAttribute: string;
    idAttributeValue: string;
  }[]
) {
  // console.log("editProductAttributes", { idProduct, attributes });

  for (let index = 0; index < attributes.length; index++) {
    const element = attributes[index];
    const relationIsExists = await checkRelationIsExists(
      idProduct,
      Number(element.idAttributeValue)
    );
    console.log("relationIsExists", relationIsExists);
  }

  // console.log("currentRelations", currentRelations);
}
