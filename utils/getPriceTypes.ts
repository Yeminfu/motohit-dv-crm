import dbConnection from "@/db/connect";
import { PriceTypesFromDBInterface } from "@/types/products/priceTypesFromDBInterface";

export default async function getPriceTypes(): Promise<
  PriceTypesFromDBInterface[]
> {
  const connection = await dbConnection();
  const images = await connection
    .query(`select * from ${process.env.TABLE_PREFIX}_price_types`)
    .then(([x]: any) => {
      return x;
    });
  await connection.end();
  return images;
}
