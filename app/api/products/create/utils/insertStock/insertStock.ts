import StockFromDBType from "@/types/products/stockFromDB";

export default async function insertStock(props: {
  connection: any
  stock: StockFromDBType[];
  session: number;
  idProduct: number;
  createdBy: number
}) {
  const results = [];
  for (let index = 0; index < props.stock.length; index++) {
    const v = props.stock[index];
    const sql = `call createProductStockItem(?,?,?,?,'createProduct')`;
    const res = await props.connection.query(sql, [props.idProduct, v.idShop, v.count, props.createdBy]);
    results.push(res);
  }
  return results;
}
