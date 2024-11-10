import dbWorker from "@/db/dbWorker";
import { ProductFromDB } from "@/types/products/prodyctType";

export default async function updateProductMainData(
  productData: ProductFromDB,
  idProduct: number
) {
  const res = await dbWorker(
    `
    update ${process.env.TABLE_PREFIX}_products
    set
      name = ?,
      note = ?,
      idCostPriceType = ?,
      idCategory = ?,
      costPriceValue = ?,
      purchase_price = ?,
      color = ?,
      code = ?
    where
      id = ?
  `,
    [
      productData.name,
      productData.note,
      productData.idCostPriceType,
      productData.idCategory,
      productData.costPriceValue,
      productData.purchase_price,
      productData.color,
      productData.code,
      idProduct,
    ]
  );
  return res;
}
