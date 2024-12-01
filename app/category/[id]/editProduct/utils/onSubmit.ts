import { ProductFromDB } from "#types/products/prodyctType.ts";
import { toast } from "react-toastify";

export default async function onSubmit(data: any): Promise<any> {
  const formData = new FormData();

  const mainProductFields: ProductFromDB = {
    id: data.idProduct,
    name: data.name,
    note: data.note,
    idCategory: data.idCategory,
    purchase_price: data.purchase_price,
    idCostPriceType: data.cost_price.type,
    costPriceValue: data.cost_price.value,
    color: data.color,
    code: data.code,
    isArchived: true,
  };
  formData.append("mainProductFields", JSON.stringify(mainProductFields));

  const retail_price = data.retail_price.map((priceObj: any) => ({
    ...priceObj,
    id: priceObj.idInDB,
  }));
  formData.append("retail_price", JSON.stringify(retail_price));

  const attributes = data.attributes;
  formData.append("attributes", JSON.stringify(attributes));

  const stock = data.stock.map((stockObj: any) => ({
    ...stockObj,
    id: stockObj.idInDB,
  }));
  formData.append("stock", JSON.stringify(stock));

  const createRes = await fetch("/api/products/edit/" + data.idProduct, {
    method: "POST",
    body: formData,
  }).then((x) => x.json());

  if (createRes.success) {
    toast.success("Данные товара изменены");
  } else {
    toast.error("Ошибка #94j \n" + JSON.stringify(createRes.errors, null, 2));
  }
}
