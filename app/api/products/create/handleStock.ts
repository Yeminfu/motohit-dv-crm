import ts_product4create from "#types/products/ts_product4create.ts";
import dbWorker from "@/db/dbWorker2";

export default async function handleStock(
  stock: ts_product4create["stock"],
  idProduct: number
) {
  for (let index = 0; index < stock.length; index++) {
    const stockObj = stock[index];
    const { idShop, shopName, count } = stockObj;
    await dbWorker(
      `insert into ${process.env.TABLE_PREFIX}_stock (idShop, count, idProduct) values (?, ?, ?)`,
      [idShop, count, idProduct]
    ).then(x => x.result);
  }
}
