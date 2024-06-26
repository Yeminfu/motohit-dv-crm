import dbConnection from "@/db/connect";
import { ProductFromDB } from "@/types/products/prodyctType";

export default async function updateProduct(product: ProductFromDB) {
  const connection = await dbConnection();
  const updateRes = await connection
    .query(
      `
      update ${process.env.TABLE_PREFIX}_products
      set
          name = ?,
          note = ?,
          idCategory = ?,
          purchase_price = ?,
          idCostPriceType = ?,
          costPriceValue = ?,
          color = ?,
          code = ?
      where id = ?`,
      [
        product.name,
        product.note,
        product.idCategory,
        product.purchase_price,
        product.idCostPriceType,
        product.costPriceValue,
        product.color,
        product.code,
        product.id,
      ]
    )
    .then(([x]: any) => {
      return x;
    })
    .catch((x) => x);

  await connection.end();
  return updateRes;
}
