import dbWorker from "@/db/dbWorker";
import StockFromDBType from "@/types/products/stockFromDB";

export default async function insertStock(props: {
  stock: StockFromDBType[];
  session: number;
  idProduct: number;
}) {
  const results = [];
  for (let index = 0; index < props.stock.length; index++) {
    const v = props.stock[index];
    const sql = `call createProductStockItem(?,?,?)`;
    const res = await dbWorker(sql, [props.idProduct, v.idShop, v.count]);
    results.push(res);
  }
  return results;
}
