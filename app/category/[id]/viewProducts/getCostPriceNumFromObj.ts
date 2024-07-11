import getAmountWithMarkup from "../../../../utils/getAmountWithMarkup";

export default function getCostPriceNumFromObj(purchasePrice: number, costPrice: {
    type: number,
    value: number
}) {
    const costPriceRes = getAmountWithMarkup(purchasePrice, costPrice);
    return costPriceRes;
}