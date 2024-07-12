import dbConnection from "@/db/connect";
import { RetailPriceFromDB } from "@/types/products/retailPriceFromDB";

export default async function getProductRetailPrices(
  idProduct: any
): Promise<RetailPriceFromDB[]> {
  const connection = await dbConnection();
  const images = await connection
    .query(
      `select 
          P.*, S.shopName, T.priceType
      from ${process.env.TABLE_PREFIX}_retail_prices P
          left join ${process.env.TABLE_PREFIX}_shops S on S.id = P.idShop
          left join ${process.env.TABLE_PREFIX}_price_types T on T.id = P.idPriceType
      where P.idProduct = ?
      `,
      [idProduct]
    )
    .then(([x]: any) => {
      return x;
    });
  await connection.end();
  return images;
}
