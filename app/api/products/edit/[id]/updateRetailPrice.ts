import dbConnection from "@/db/connect";
import { RetailPriceFromDB } from "@/types/products/retailPriceFromDB";

export default async function updateRetailPrice(retailPriceObj: RetailPriceFromDB) {

    const connection = await dbConnection();
    const updateRes = await connection
      .query(
        `
        update ${process.env.TABLE_PREFIX}_retail_prices
        set
          idPriceType = ?,
          priceValue = ?,
          idProduct = ?,
          idShop = ?
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
  