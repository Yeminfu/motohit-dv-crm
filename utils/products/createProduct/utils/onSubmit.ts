import { ProductOnCreate } from "#types/products/prodyctType.ts";
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

  const oldImages = formValues.oldImages;
  formData.append("oldImages", JSON.stringify(oldImages));

  const newImages = formValues.newImages;
  if (newImages) {
    for (let index = 0; index < newImages.length; index++) {
      formData.append("newImages", newImages[index]);
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
    if (data.success) {
      toast.success("Товар сохранен");
    } else {
      alert("Ошибка #dkas93 \n" + JSON.stringify(data.errors, null, 2));
    }
  } catch (error) {
    alert("Ошибка #ssjj3");
  }
  // console.log("data", data);

  // return;

  // const {
  //   name,
  //   code,
  //   color,
  //   cost_price,
  //   note,
  //   purchase_price,
  //   retail_price,
  //   stock,
  //   idCategory,
  //   images,
  //   attributes,
  // } = data;

  // const scalarData: ProductOnCreate = {
  //   name,
  //   code,
  //   color,
  //   cost_price,
  //   note,
  //   purchase_price,
  //   retail_price,
  //   stock,
  //   idCategory,
  //   attributes,
  // };

  // const jsonData = JSON.stringify(scalarData, null, "");

  // const formData = new FormData();

  // formData.append("jsonData", jsonData);

  // if (images) {
  //   for (let i = 0; i < images.length; i++) {
  //     formData.append("images", images[i]);
  //   }
  // }
  // const createRes = await fetch("/api/products/create", {
  //   method: "POST",
  //   body: formData,
  // }).then((x) => x.json());

  // return createRes;
}
