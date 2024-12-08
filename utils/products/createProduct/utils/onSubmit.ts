import { ProductOnCreate } from "#types/products/prodyctType.ts";

export default async function onSubmit(data: any) {
  const {
    name,
    code,
    color,
    cost_price,
    note,
    purchase_price,
    retail_price,
    stock,
    idCategory,
    images,
    attributes,
  } = data;

  const scalarData: ProductOnCreate = {
    name,
    code,
    color,
    cost_price,
    note,
    purchase_price,
    retail_price,
    stock,
    idCategory,
    attributes,
  };

  const jsonData = JSON.stringify(scalarData, null, "");

  const formData = new FormData();

  formData.append("jsonData", jsonData);

  if (images) {
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
  }
  const createRes = await fetch("/api/products/create", {
    method: "POST",
    body: formData,
  }).then((x) => x.json());

  return createRes;
}
