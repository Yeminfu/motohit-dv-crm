import { NextRequest, NextResponse } from "next/server";
import updateIndexNumbers from "./utils/updateIndexNumbers";

export async function POST(request: NextRequest) {
  const data: {
    idProduct: number,
    idNextProduct: number
  } = await request.json();
  const res = await updateIndexNumbers(data.idProduct, data.idNextProduct);
  return NextResponse.json(res);
}



