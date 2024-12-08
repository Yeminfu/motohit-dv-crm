import getCategoryAttributesWithValues from "./getCategoryAttributesWithValues";
import getAttributesByIdCategory from "./getAttributesByIdCategory";
import ts_attributeWithValuesAndDefaultValue from "../types/ts_AttributeWithValues";

export default async function getAttributesWithValues(
  idCategory: number
): Promise<ts_attributeWithValuesAndDefaultValue[]> {
  const categoryAttributesWithValues = await getCategoryAttributesWithValues(
    idCategory
  );

  const productAttributes = await getAttributesByIdCategory(idCategory);

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
