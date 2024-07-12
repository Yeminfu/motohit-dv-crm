import getProductsFull from "@/utils/getProductsFull";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  params: { params: { id: string } }
) {
  const idCategory = Number(params.params.id);

  const products = await getProductsFull(idCategory);

  return NextResponse.json({ success: null, products });
}
