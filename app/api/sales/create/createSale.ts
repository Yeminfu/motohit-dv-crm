import dbConnection from "@/db/connect";
import { t_CreateSaleResponseData } from "@/types/sales/t_CreateSaleResponseData";

export async function createSale(
  saleData: t_CreateSaleResponseData,
  idUser: number
) {
  const connection = await dbConnection();
  const res = await connection
    .query(
      `insert into ${process.env.TABLE_PREFIX}_sales
      (
        idProduct,
        idShop,
        createtByUserId,
        count,
        sum
      )
    values (
      ?,
      ?,
      ?,
      ?,
      ?
    )
  `,
      [saleData.idProduct, saleData.idProduct, idUser, saleData.count, saleData.sumTotal]
    )
    .then(([x]: any) => {
      return x;
    })
    .catch((error) => {
      return error;
    });
  await connection.end();
  return res;
}
