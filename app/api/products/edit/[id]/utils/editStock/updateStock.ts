import dbConnection from "@/db/connect";
import StockFromDBType from "@/types/products/stockFromDB";

export default async function updateStock(stockObj: StockFromDBType, idProduct: number) {
  const connection = await dbConnection();
  const qs = `
  update ${process.env.TABLE_PREFIX}_stock
  set
    idProduct = ?,
    idShop = ?,
    count = ?
  where id = ?`;

  const updateRes = await connection
    .query(
      qs,
      [idProduct, stockObj.idShop, stockObj.count, stockObj.idRecord]
    )
    .then(([x]: any) => {
      return x;
    })
    .catch((x) => x);
  await connection.end();
  return updateRes;
}
