import { RetailPriceFromDB } from "@/types/products/retailPriceFromDB";
import getAmountWithMarkup from "../../../../utils/getAmountWithMarkup";

export default function getRetailPriceNumFromObj(
  purchasePrice: number,
  retailPriceObj: RetailPriceFromDB,
  costPrice: {
    type: number;
    value: number;
  }
) {
  const costPriceRes = getAmountWithMarkup(purchasePrice, costPrice);
  const retailPriceRes = getAmountWithMarkup(costPriceRes, {
    value: retailPriceObj.priceValue,
    type: retailPriceObj.idPriceType,
  });
  return retailPriceRes;
}
