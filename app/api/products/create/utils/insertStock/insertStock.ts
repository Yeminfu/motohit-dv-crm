import dbWorker from "@/db/dbWorker";
import StockFromDBType from "@/types/products/stockFromDB";

export default async function insertStock(props: {
  stock: StockFromDBType[];
  session: number;
  idProduct: number;
}) {
  const sql = `
  insert into ${process.env.TABLE_PREFIX}_stock
  (
    idProduct,
    idShop,
    count
  )
  values
    ${props.stock.map(() => "(?,?,?)")}
  `;

  const values = props.stock
    .map((v) => [props.idProduct, v.idShop, v.count])
    .flat();

  const res = await dbWorker(sql, values);
  return res;
}
