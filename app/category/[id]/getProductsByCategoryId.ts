import dbConnection from "@/db/connect";
import { ProductFromDB } from "@/types/products/prodyctType";

export default async function getProductsByCategoryId(
  idCategory: string | number
): Promise<ProductFromDB[]> {
  const connection = await dbConnection();
  const products = await connection
    .query(
      `select * from ${process.env.TABLE_PREFIX}_products where idCategory = ?`,
      [idCategory]
    )
    .then(([x]: any) => {
      return x;
    });

  await connection.end();
  return products;
}
