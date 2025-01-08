import dbWorker from "#db/dbWorker2.ts";
import StockFromDBType from "#types/products/stockFromDB.ts";

export default async function editStock(props: {
  stock: StockFromDBType[];
  session: number;
  idProduct: number;
}) {
  const results = [];

  for (let index = 0; index < props.stock.length; index++) {
    const v = props.stock[index];
    const res = await dbWorker(`call updateStockItem(?,?,?)`, [
      props.idProduct,
      v.idShop,
      v.count,
    ]);
    results.push(res);
  }

  return results;
}
