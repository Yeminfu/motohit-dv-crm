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
      color = ?,
      code = ?
    where
      id = ?
  `, [
    productData.name,
    productData.note,
    productData.idCostPriceType,
    productData.costPriceValue,
    productData.color,
    productData.code,
    idProduct,
  ]
  )
    .then(([x]) => x);
  await connection.end();
  return res;
}
