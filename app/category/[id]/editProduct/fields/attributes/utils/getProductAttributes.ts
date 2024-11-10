import ts_productAttributes from "#app/api/attributes/getProductAttributes/types/ts_productAttributes.js";

export default async function getProductAttributes(
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
    } else {
      alert("err #d03dsmn");
      return [];
    }
  } catch (error) {
    alert("err #d0303mn");
    return [];
  }
}
