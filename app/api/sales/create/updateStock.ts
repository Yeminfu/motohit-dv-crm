import dbConnection from "@/db/connect";
import { t_CreateSaleResponseData } from "@/types/sales/t_CreateSaleResponseData";

export default async function updateStock(saleData: t_CreateSaleResponseData) {
  const connection = await dbConnection();
  const res = await connection
    .query(
      `
    update ${process.env.TABLE_PREFIX}_stock 
    set
        count = count - ?
    where
      idProduct = ?
      and idShop = ?`,
      [saleData.count, saleData.idProduct, saleData.idShop]
    )
    .then(([x]: any) => {
      return x;
    })
    .catch((err: any) => {
      return err;
    });
  await connection.end();
  return res;
}
