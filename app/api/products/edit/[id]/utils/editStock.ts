import StockFromDBType from "#types/products/stockFromDB.ts";

export default async function editStock(props: {
  connection: any,
  stock: StockFromDBType[];
  session: number;
  idProduct: number;
  updatedBy: number
}) {

  const results = [];

  for (let index = 0; index < props.stock.length; index++) {
    const v = props.stock[index];
    const res = await props.connection.query(`call updateStockItem(?,?,?,?)`, [
      props.idProduct,
      v.idShop,
      v.count,
      props.updatedBy
    ]);
    results.push(res);
  }

  return results;
}
