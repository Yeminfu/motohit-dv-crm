import { toast } from "react-toastify";

export default async function onSubmit(formValues: any) {
  const formData = new FormData();

  const productMainData: any = {
    id: formValues.idProduct,
    name: formValues.name,
    note: formValues.note,
    idCategory: formValues.idCategory,
    purchase_price: formValues.purchase_price,
    idCostPriceType: formValues.cost_price.type,
    costPriceValue: formValues.cost_price.value,
    color: formValues.color,
    code: formValues.code,
    isArchived: true,
  };
  formData.append("productMainData", JSON.stringify(productMainData));

  const retail_price = formValues.retail_price.map((priceObj: any) => ({
    ...priceObj,
    id: priceObj.idInDB,
  }));
  formData.append("retail_price", JSON.stringify(retail_price));

  const attributes = formValues.attributes;
  formData.append("attributes", JSON.stringify(attributes));

  const stock = formValues.stock.map((stockObj: any) => ({
    ...stockObj,
    id: stockObj.idInDB,
  }));
  formData.append("stock", JSON.stringify(stock));

  const images = formValues.images;
  if (images) {
    for (let index = 0; index < images.length; index++) {
      formData.append("images", images[index]);
    }
  }

  try {
    const response = await fetch("/api/products/create", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    const data = await response.json();
    if (data?.result?.idProduct) {
      toast.success("Товар сохранен");
    } else {
      alert("Ошибка #dkas93 \n" + JSON.stringify(data, null, 2));
    }
  } catch (error) {
    alert("Ошибка #ssjj3");
  }
}
