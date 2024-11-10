import ts_productAttributes from "#app/api/attributes/getProductAttributes/types/ts_productAttributes.ts";

export default async function getAttributesByIdProduct(
  idProduct: number
): Promise<ts_productAttributes[]> {
  try {
    const response = await fetch("/api/attributes/getProductAttributes", {
      method: "POST",
      body: JSON.stringify({
        idProduct,
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
