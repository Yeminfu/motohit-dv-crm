import { RetailPriceFromDB } from "#types/products/retailPriceFromDB.js";
import { ResultSetHeader } from "mysql2";

export default async function createRetailPrices(
  connection: any,
  idProduct: number,
  retail_price: RetailPriceFromDB[]
): Promise<ResultSetHeader[]> {
  const results = [];

  for (let index = 0; index < retail_price.length; index++) {
    const v = retail_price[index];
    const sql = `call createProductRetailPrice(?,?,?,?)`;
    const result = await connection.query(sql, [
      v.idPriceType,
      v.priceValue,
      idProduct,
      v.idShop,
    ]);
    results.push(result);
  }

  return results;
}
