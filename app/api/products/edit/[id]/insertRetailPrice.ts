import dbConnection from "@/db/connect";
import { RetailPriceFromDB } from "@/types/products/retailPriceFromDB";

export default async function insertRetailPrice(retailPriceObj: RetailPriceFromDB) {

  const connection = await dbConnection();
  const updateRes = await connection
    .query(
      `
        insert into ${process.env.TABLE_PREFIX}_retail_prices
        (
          idPriceType,
          priceValue,
          idProduct,
          idShop
        )
        values
        (
          ?,?,?,?
        )
        where id  = ?`,
      [
        retailPriceObj.idPriceType,
        retailPriceObj.priceValue,
        retailPriceObj.idProduct,
        retailPriceObj.idShop,
        retailPriceObj.idRecord
      ]
    )
    .then(([x]: any) => {
      return x;
    })
    .catch((x) => x);
  await connection.end();
  return updateRes;
}
