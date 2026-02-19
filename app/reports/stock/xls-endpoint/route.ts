import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, params: any) {
  //@ts-ignore
  const searchParams = request.nextUrl.searchParams;

  const idShop = searchParams.get("s");

  return NextResponse.json({ idShop });
}
