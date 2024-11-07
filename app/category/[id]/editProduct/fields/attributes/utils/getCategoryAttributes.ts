import ts_AttributeWithValues from "@/types/attributes/ts_attributesWithValues";

export default async function getCategoryAttributes(
  idCategory: number
): Promise<ts_AttributeWithValues[]> {
  // console.log("getCategoryAttributes", idCategory);
  try {
    const response = await fetch("/api/attributes/getCategoryAttributes", {
      method: "POST",
      body: JSON.stringify({
        idCategory,
      }),
    });
    if (!response.ok) {
      alert("err #f943mn");
      throw new Error(`Ошибка: ${response.statusText}`);
    }
    const data = await response.json();

    if (data.attributes) {
      return data.attributes;
      // console.log("Обновления:", data);
      // Здесь вы можете обработать обновления, например, отправить ответ на сообщения
    } else {
      alert("err #d03mn");
      return [];
    }
  } catch (error) {
    alert("err #d03mn");
    return [];
  }
}
