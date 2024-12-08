import dbWorker from "#db/dbWorker.ts";
import { RetailPriceFromDB } from "#types/products/retailPriceFromDB.js";
import { ResultSetHeader } from "mysql2";

export default async function createRetailPrices(
  idProduct: number,
  retail_price: RetailPriceFromDB[]
): Promise<ResultSetHeader> {
  const sql = `
  insert into ${process.env.TABLE_PREFIX}_retail_prices
  (
    idPriceType,
    priceValue,
    idProduct,
    idShop
  )
  values
    ${retail_price.map(() => "(?,?,?,?)")}
  `;

  const values = retail_price
    .map((v) => [v.idPriceType, v.priceValue, idProduct, v.idShop])
    .flat();

  const res = await dbWorker(sql, values);
  return res;
}
