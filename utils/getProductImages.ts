import { ts_imageFromDB } from "#types/products/ts_imageFromDB.js";
import dbConnection from "@/db/connect";

export default async function getProductImages(
  idProduct: any
): Promise<ts_imageFromDB[]> {
  const connection = await dbConnection();
  const images = await connection
    .query(
      `select * from ${process.env.TABLE_PREFIX}_products_images where idProduct = ?`,
      [idProduct]
    )
    .then(([x]: any) => {
      return x;
    });
  await connection.end();

  return images;
}
