import getIdAttributeByProductAndValue from "./getIdAttributeByProductAndValue";

export default async function editProductAttributes(
  idProduct: number,
  attributes: {
    idAttribute: string;
    idAttributeValue: string;
  }[]
) {
  for (let index = 0; index < attributes.length; index++) {
    const element = attributes[index];
    const relationIsExists = await getIdAttributeByProductAndValue(
      idProduct,
      Number(element.idAttributeValue)
    );
    console.log("relationIsExists", relationIsExists);
  }
}
