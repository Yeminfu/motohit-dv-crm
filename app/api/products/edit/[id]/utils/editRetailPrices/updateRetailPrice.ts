import { RetailPriceFromDB } from "@/types/products/retailPriceFromDB";

export default async function updateRetailPrice(
  connection: any,
  retailPriceObj: RetailPriceFromDB
) {
  await connection
    .query(`call updateRetailPrice(?,?,?,?,?)`, [
      retailPriceObj.idProduct,
      retailPriceObj.idShop,
      retailPriceObj.idPriceType,
      retailPriceObj.priceValue,
      retailPriceObj.idRecord,
    ])

}
