export default function generatePriceByTypes(prevPriceSum: number, idNewPriceType: number, newPriceValue: number) {
    if (idNewPriceType === 1) {
        return newPriceValue;
    }
    if (idNewPriceType === 2) {
        return prevPriceSum + newPriceValue;
    }
    if (idNewPriceType === 3) {
        return prevPriceSum * newPriceValue;
    }
    return 0;
    // 1 	fix
    // 2 	handle
    // 3 	percent
}