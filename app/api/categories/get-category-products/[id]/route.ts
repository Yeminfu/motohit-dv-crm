import ts_categoryFilter from "@/types/ts_categoryFilter";
import getProductsFull from "@/utils/getProductsFull";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  params: { params: { id: string } }
) {

  const body: { searchParams: ts_categoryFilter } = await request.json();

  const idCategory = Number(params.params.id);

  const products = await getProductsFull(idCategory, body.searchParams);

  return NextResponse.json({ success: null, products });
}
