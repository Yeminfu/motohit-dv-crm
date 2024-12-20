import { ProductFromDB } from "#types/products/prodyctType.ts";
import { toast } from "react-toastify";

export default async function onSubmit(formValues: any): Promise<any> {
  const formData = new FormData();

  const mainProductFields: ProductFromDB = {
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
  formData.append("mainProductFields", JSON.stringify(mainProductFields));

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

  const oldImages = formValues.oldImages;
  formData.append("oldImages", JSON.stringify(oldImages));

  const newImages = formValues.newImages;
  if (newImages) {
    for (let index = 0; index < newImages.length; index++) {
      formData.append("newImages", newImages[index]);
    }
  }

  try {
    const response = await fetch("/api/products/edit/" + formValues.idProduct, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    const data = await response.json();
    if (data.success) {
      toast.success("Данные товара изменены");
    } else {
      alert("Ошибка #94j \n" + JSON.stringify(data.errors, null, 2));
    }
  } catch (error) {
    alert("Ошибка #d03nbd");
  }
}
