import { t_CreateSaleResponseData } from "@/types/sales/t_CreateSaleResponseData";
import getUserByToken from "@/utils/users/getUserByToken";
import { NextRequest, NextResponse } from "next/server";
import { createSale } from "./createSale";
import dbConnection from "@/db/connect";

export async function POST(request: NextRequest) {
  const data: t_CreateSaleResponseData = await request.json();
  const { cookies } = request;
  const authToken = String(cookies.get("auth")?.value);

  const user = await getUserByToken(authToken);

  const isAvailable = await checkAvailableCreateSale(data);

  if (!user)
    return NextResponse.json({
      success: false,
      error: "Нет прав",
    });

  const createSaleRes = await createSale(data, user.id);

  return NextResponse.json({
    success: null,
    data,
    authToken,
    user,
    createSaleRes,
    isAvailable,
  });
}

async function checkAvailableCreateSale(saleData: t_CreateSaleResponseData) {
  const connection = await dbConnection();
  const count = await connection
    .query(
      `
  select 
    * 
  from ${process.env.TABLE_PREFIX}_stock 
  where
    idProduct = ?
    and idShop = ?`,
      [saleData.idProduct, saleData.idShop]
    )
    .then(([x]: any) => {
      return x.pop().count;
    });
  await connection.end();
  const diff = count - saleData.count;
  return diff >= 0;
}
