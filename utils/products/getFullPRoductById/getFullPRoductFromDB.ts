import dbConnection from "@/db/connect";
import { ProductFromDB } from "@/types/products/prodyctType";

export default async function getFullProductFromDB(idProduct: number) {
  const product = await getProductFromDB(idProduct);
  return product;
}

async function getProductFromDB(
  idProduct: string | number
): Promise<ProductFromDB[]> {
  const connection = await dbConnection();
  const products = await connection
    .query(`select * from ${process.env.TABLE_PREFIX}_products where id = ?`, [
      idProduct,
    ])
    .then(([x]: any) => {
      return x;
    });

  await connection.end();
  return products;
}
