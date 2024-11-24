import { NextRequest, NextResponse } from "next/server";
import getAttributes from "./utils/getAttributes";

export async function POST(a: NextRequest, b: any) {
  const { idProduct } = await a.json();

  const attributes = await getAttributes(idProduct);

  return NextResponse.json({
    attributes,
  });
}
