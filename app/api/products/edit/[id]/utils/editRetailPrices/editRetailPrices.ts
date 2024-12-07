import { RetailPriceFromDB } from "#types/products/retailPriceFromDB.ts";
import addHistoryEntry from "#utils/history/addHistoryEntry.ts";
import insertRetailPrice from "./insertRetailPrice";
import updateRetailPrice from "./updateRetailPrice";

export default async function editRetailPrices(
  retail_price: RetailPriceFromDB[]
) {
  for (let index = 0; index < retail_price.length; index++) {
    const retailPriceObj = retail_price[index];
    if (retailPriceObj.idRecord) {
      const updRetailPriceRes = await updateRetailPrice(retailPriceObj);
      await addHistoryEntry("updateProductRetailPrice", {
        retailPriceObj,
        updRetailPriceRes,
      });
    } else {
      const insertRetailPriceRes = await insertRetailPrice(retailPriceObj);
      await addHistoryEntry("insertProductRetailPrice", {
        retailPriceObj,
        insertRetailPriceRes,
      });
    }
  }
}
