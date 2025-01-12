import { RetailPriceFromDB } from "#types/products/retailPriceFromDB.ts";
import updateRetailPrice from "./updateRetailPrice";

export default async function editRetailPrices(
  connection: any,
  retail_price: RetailPriceFromDB[]
) {
  for (let index = 0; index < retail_price.length; index++) {
    const retailPriceObj = retail_price[index];
    await updateRetailPrice(connection, retailPriceObj);
  }
}
