import dbConnection from "@/db/connect";
import { ProductFromDB } from "@/types/products/prodyctType";

export default async function updateProductMainData(productData: ProductFromDB, idProduct: number) {
  const connection = await dbConnection();
  const res = await connection.query(
    `
    update ${process.env.TABLE_PREFIX}_products
    set
      name = ?,
      note = ?,
      idCostPriceType = ?,
      costPriceValue = ?,
      purchase_price = ?,
      color = ?,
      code = ?
    where
      id = ?
  `, [
    productData.name,
    productData.note,
    productData.idCostPriceType,
    productData.costPriceValue,
    productData.purchase_price,
    productData.color,
    productData.code,
    idProduct,
  ]
  )
  await connection.end();
  return res;
}
