import ts_AttributeWithValues from "@/types/attributes/ts_attributesWithValues";
import getCategoryAttributesWithValues from "./getCategoryAttributesWithValues";
import getAttributesByIdProduct from "./getAttributesByIdProduct";

type ts_attributeWithValuesAndDefaultValue = ts_AttributeWithValues & {
  idDefaultAttributeValue: string;
};

export default async function getAttributesWithValues(
  idCategory: number,
  idProduct: number
): Promise<ts_attributeWithValuesAndDefaultValue[]> {
  const categoryAttributesWithValues = await getCategoryAttributesWithValues(
    idCategory
  );

  const productAttributes = await getAttributesByIdProduct(idProduct);

  const attributesWithValuesAndDefaultValue: ts_attributeWithValuesAndDefaultValue[] =
    categoryAttributesWithValues.map((categoryAttribute) => {
      const match = productAttributes.find(
        (PA) => PA.idAttribute === categoryAttribute.id
      );
      return {
        ...categoryAttribute,
        idDefaultAttributeValue: String(match?.idAttributeValue) || "",
      };
    });
  return attributesWithValuesAndDefaultValue;
}
