import dbWorker from "@/db/dbWorker";
import { RetailPriceFromDB } from "@/types/products/retailPriceFromDB";

export default async function insertRetailPrice(retailPriceObj: RetailPriceFromDB) {

  const updateRes = await dbWorker(
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
        )`,
    [
      retailPriceObj.idPriceType,
      retailPriceObj.priceValue,
      retailPriceObj.idProduct,
      retailPriceObj.idShop
    ]
  )
    .then((x: any) => {
      return x;
    })
    .catch((x) => x);
  return updateRes;
}
