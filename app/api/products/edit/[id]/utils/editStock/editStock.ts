import StockFromDBType from "#types/products/stockFromDB.ts";
import addHistoryEntry from "#utils/history/addHistoryEntry.ts";
import insertStock from "./insertStock";
import updateStock from "./updateStock";

export default async function editStock(props: {
  stock: StockFromDBType[];
  session: number;
  idProduct: number;
}) {
  for (let index = 0; index < props.stock.length; index++) {
    const stockObj = props.stock[index];
    if (stockObj.idRecord) {
      const updRes = await updateStock(stockObj, props.idProduct);
      await addHistoryEntry("updateStock", {
        session: props.session,
        stockObj,
        updRes,
      });
    } else {
      const insertRes = await insertStock(stockObj, props.idProduct);
      await addHistoryEntry("insertStock", {
        session: props.session,
        stockObj,
        insertRes,
      });
    }
  }
}
