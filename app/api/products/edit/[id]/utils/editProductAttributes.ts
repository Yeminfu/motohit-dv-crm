import dbWorker from "#db/dbWorker.ts";

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
  }

  // console.log("currentRelations", currentRelations);
}

async function getCurrentProductRelations() {}
