import { NextRequest, NextResponse } from "next/server";
import getAttributes from "./utils/getAttributes";

export async function POST(a: NextRequest, b: any) {
  const { idProduct } = await a.json();
  console.log({ idProduct });

  const attributes = await getAttributes(idProduct);
  console.log("attributes", attributes);

  return NextResponse.json({
    attributes,
  });
}
