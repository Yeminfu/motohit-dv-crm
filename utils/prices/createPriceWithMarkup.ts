export default function createPriceWithMarkup(startPrice: number, idNewPriceType: number, newPriceValue: number) {
  if (idNewPriceType === 1) {
    return Math.ceil(startPrice + newPriceValue);
  }
  if (idNewPriceType === 2) {
    return Math.ceil(newPriceValue);
  }
  if (idNewPriceType === 3) {
    return Math.ceil(startPrice * newPriceValue);
  }
  return 0;
  // 1    fix
  // 2 	handle
  // 3 	percent
}
