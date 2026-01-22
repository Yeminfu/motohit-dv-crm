export default function createPriceWithMarkup(
  startPrice: number,
  idNewPriceType: number,
  newPriceValue: number,
  markup: number = 0
) {
  if (idNewPriceType === 1) {
    return Math.ceil(startPrice + newPriceValue + markup);
  }
  if (idNewPriceType === 2) {
    return Math.ceil(newPriceValue + markup);
  }
  if (idNewPriceType === 3) {
    return Math.ceil(startPrice * newPriceValue + markup);
  }
  return 0;
  // 1    fix
  // 2 	handle
  // 3 	percent
}
