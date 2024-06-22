import dbConnection from "@/db/connect";
import { t_CreateSaleResponseData } from "@/types/sales/t_CreateSaleResponseData";

export async function createSale(
  saleData: t_CreateSaleResponseData,
  idUser: number
): Promise<{
  success: boolean;
  error?: any;
}> {
  const connection = await dbConnection();
  const res = await connection
    .query(
      `insert into ${process.env.TABLE_PREFIX}_sales
      (
        idProduct,
        createtByUserId,
        count,
        sum
      )
    values (
      ?,
      ?,
      ?,
      ?
    )
  `,
      [saleData.idProduct, idUser, saleData.count, saleData.sumTotal]
    )
    .then(([x]: any) => {
      console.log("xxx", x);
      return {
        success: !!x.insertId,
      };
    })
    .catch((error) => {
      return {
        success: false,
        error,
      };
    });
  await connection.end();
  return res;
}
