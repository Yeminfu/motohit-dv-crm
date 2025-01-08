import dbConnection from "@/db/connect";
import { RetailPriceFromDB } from "@/types/products/retailPriceFromDB";

export default async function updateRetailPrice(
  retailPriceObj: RetailPriceFromDB
) {
  const connection = await dbConnection();
  const updateRes = await connection
    .query(`call updateRetailPrice(?,?,?,?,?)`, [
      retailPriceObj.idProduct,
      retailPriceObj.idShop,
      retailPriceObj.idPriceType,
      retailPriceObj.priceValue,
      retailPriceObj.idRecord,
    ])
    .then(([x]: any) => {
      return x;
    })
    .catch((x) => x);
  await connection.end();
  return updateRes;
}
