import ts_productAttributes from "#app/api/attributes/getProductAttributes/types/ts_productAttributes.ts";

export default async function getAttributesByIdCategory(
  idCategory: number
): Promise<ts_productAttributes[]> {
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
      alert("err #as0dm3n");
      throw new Error(`Ошибка: ${response.statusText}`);
    }
    const data = await response.json();

    if (data.attributes) {
      return data.attributes;
      // Здесь вы можете обработать обновления, например, отправить ответ на сообщения
    } else {
      alert("err #s8dn3");
      return [];
    }
  } catch (error) {
    alert("err #kdjb47");
    return [];
  }
}
