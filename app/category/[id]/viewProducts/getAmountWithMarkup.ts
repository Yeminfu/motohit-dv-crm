export default function getAmountWithMarkup(
  sum: number,
  markup: {
    type: number;
    value: number;
  }
): number {
  if (markup.type === 1) {
    return markup.value;
  }
  if (markup.type === 2) {
    return sum + markup.value;
  }
  if (markup.type === 3) {
    return sum * markup.value;
  }
  return 0;
  // 1 	fix
  // 2 	handle
  // 3 	percent
}
