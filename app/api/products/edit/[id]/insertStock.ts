import dbConnection from "@/db/connect";
import StockFromDBType from "@/types/products/stockFromDB";

export default async function insertStock(stockObj: StockFromDBType, idProduct: number) {
  const connection = await dbConnection();
  const qs = `
  insert into ${process.env.TABLE_PREFIX}_stock
  (idProduct, idShop, count)
  values (?,?,?)`;

  const res = await connection
    .query(
      qs,
      [idProduct, stockObj.idShop, stockObj.count]
    )
    .then(([x]: any) => {
      return x;
    })
    .catch((x) => x);
  await connection.end();
  return res;
}
