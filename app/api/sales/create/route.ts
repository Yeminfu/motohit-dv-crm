import { t_CreateSaleResponseData } from "@/types/sales/t_CreateSaleResponseData";
import getUserByToken from "@/utils/users/getUserByToken";
import { NextRequest, NextResponse } from "next/server";
import { createSale } from "./createSale";
import updateStock from "./updateStock";

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

  const updateRes = await updateStock(data);

  if (updateRes?.code === "ER_WARN_DATA_OUT_OF_RANGE") {
    return NextResponse.json({
      success: false,
      error: "Вы пытаетесь списать больше, чем есть на складе",
    });
  }

  const createSaleRes = await createSale(data, user.id);

  if (!createSaleRes.insertId)
    return NextResponse.json({
      success: false,
      error: "Плохая ошибка #fsd9",
    });

  return NextResponse.json({
    success: true,
  });
}
