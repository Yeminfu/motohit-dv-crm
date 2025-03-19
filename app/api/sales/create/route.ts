import { t_CreateSaleResponseData } from "@/types/sales/t_CreateSaleResponseData";
import getUserByToken from "@/utils/users/getUserByToken";
import { NextRequest, NextResponse } from "next/server";
import dbConnection from "@/db/connect";

export async function POST(request: NextRequest) {
  const data: t_CreateSaleResponseData = await request.json();
  const { cookies } = request;
  const authToken = String(cookies.get("auth")?.value);

  const user = await getUserByToken(authToken);

  if (!user)
    return NextResponse.json({
      success: false,
      error: "Нет прав",
    });

  const connection = await dbConnection();

  try {

    await connection.beginTransaction();

    await createSale(
      connection,
      Number(data.idProduct),
      Number(data.idShop),
      Number(data.count),
      data.sumTotal,
      user.id
    )

    await connection.commit();
    await connection.end();
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("err #d0d3k4u", error);
    await connection.rollback();
    await connection.end();
    return NextResponse.json({ error: error })
  }
}

async function createSale(
  connection: any, idProduct: number, idShop: number, count: number, saleSum: number, idUser: number
) {
  const sql = `
    set @idProduct = ?;
    set @idShop = ?;
    set @count = ?;
    set @saleSum = ?;
    set @idUser = ?;

    call createSale (
      @idProduct,
      @idShop,
      @count,
      @saleSum,
      @idUser
    ) 
  `;
  return await connection.query(sql, [idProduct, idShop, count, saleSum, idUser]);

}