export default async function getImages(idProduct: number) {
  try {
    const response = await fetch(
      `/api/products/get-product-images/${idProduct}`,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      alert("err #sks8s8");
      throw new Error(`Ошибка: ${response.statusText}`);
    }
    const data = await response.json();

    if (data.images) {
      return data.images;
    } else {
      alert("err #ccds4");
      return [];
    }
  } catch (error) {
    alert("err #s9ss9j3j");
    return [];
  }
}
