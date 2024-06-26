import dbConnection from "@/db/connect";
import StockFromDBType from "@/types/products/stockFromDB";

export default async function updateStock(stockObj: StockFromDBType) {
  const connection = await dbConnection();
  const updateRes = await connection
    .query(
      `
        update ${process.env.TABLE_PREFIX}_stock
        set
          idProduct = ?,
          idShop = ?,
          count = ?
        where id = ?`,
      [stockObj.idProduct, stockObj.idShop, stockObj.count, stockObj.id]
    )
    .then(([x]: any) => {
      return x;
    })
    .catch((x) => x);
  await connection.end();
  return updateRes;
}
