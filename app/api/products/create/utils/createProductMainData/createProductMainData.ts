import dbWorker from "#db/dbWorker.ts";
import slugify from "slugify";

export default async function createProductMainData(
  productData: any
): Promise<any> {
  const res = await dbWorker(
    `
    call createProduct(?, ?, ?, ?, ?, ?, ?, ?, ?, @idProduct);
    select @idProduct as idProduct;
  `,
    [
      productData.idCategory,
      productData.name,
      slugify(productData.name.trim()),
      productData.note,
      productData.idCostPriceType,
      productData.costPriceValue,
      productData.purchase_price,
      productData.code,
      productData.color,
    ]
  );
  return res;
}
