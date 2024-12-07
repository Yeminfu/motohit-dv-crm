import dbWorker from "@/db/dbWorker";
import StockFromDBType from "@/types/products/stockFromDB";

export default async function insertStock(stockObj: StockFromDBType, idProduct: number) {
  const qs = `
  insert into ${process.env.TABLE_PREFIX}_stock
  (idProduct, idShop, count)
  values (?,?,?)`;

  const res = await dbWorker(
    qs,
    [idProduct, stockObj.idShop, stockObj.count]
  )
    .then((x: any) => {
      return x;
    })
    .catch((x) => x);
  return res;
}
