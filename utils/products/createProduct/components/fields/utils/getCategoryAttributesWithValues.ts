import ts_AttributeWithValues from "#types/attributes/ts_attributesWithValues.js";
// import { AttributeType } from "@/types/categories/attributes.js";

export default async function getCategoryAttributesWithValues(
  idCategory: number
): Promise<ts_AttributeWithValues[]> {
  try {
    const response = await fetch(
      "/api/attributes/getCategoryAttributesWithValues",
      {
        method: "POST",
        body: JSON.stringify({
          idCategory,
        }),
      }
    );
    if (!response.ok) {
      alert("err #f943mn0s");
      throw new Error(`Ошибка: ${response.statusText}`);
    }
    const data = await response.json();

    if (data.attributes) {
      return data.attributes;
      // Здесь вы можете обработать обновления, например, отправить ответ на сообщения
    } else {
      alert("err #da9sn3n");
      return [];
    }
  } catch (error) {
    alert("err #s0sn3n");
    return [];
  }
}
