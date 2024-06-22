import dbConnection from "@/db/connect";
import { ShopFromDB } from "@/types/shops/shopFromDBType";

export default async function getShops(): Promise<ShopFromDB[]> {
  const connection = await dbConnection();
  const images = await connection
    .query(`select * from ${process.env.TABLE_PREFIX}_shops`)
    .then(([x]: any) => {
      return x;
    });
  await connection.end();
  return images;
}
