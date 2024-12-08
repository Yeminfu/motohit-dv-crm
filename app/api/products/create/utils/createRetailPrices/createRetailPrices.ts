import dbWorker from "#db/dbWorker.ts";
import { RetailPriceFromDB } from "#types/products/retailPriceFromDB.js";

export default async function createRetailPrices(
  idProduct: number,
  retail_price: RetailPriceFromDB[]
) {
  const sql = `
  insert into ${process.env.TABLE_PREFIX}_retail_prices
  (
    idPriceType,
    priceValue,
    idProduct,
    idShop
  )
  values
  (
    ${retail_price.map(() => "(?,?,?,?)")}
  )
  `;

  console.log("sql", sql);

  const values = retail_price
    .map((v) => [v.idPriceType, v.priceValue, idProduct, v.idShop])
    .flat();

  console.log("values", values);

  const res = await dbWorker(sql, values);
  console.log("res", res);

  // console.log("retail_price", retail_price);
}
