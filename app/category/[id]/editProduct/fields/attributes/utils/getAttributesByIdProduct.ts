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
      alert("err #f943mn2k");
      throw new Error(`Ошибка: ${response.statusText}`);
    }
    const data = await response.json();

    if (data.attributes) {
      return data.attributes;
      // Здесь вы можете обработать обновления, например, отправить ответ на сообщения
    } else {
      alert("err #dss93j");
      return [];
    }
  } catch (error) {
    alert("err #djsan4b");
    return [];
  }
}
