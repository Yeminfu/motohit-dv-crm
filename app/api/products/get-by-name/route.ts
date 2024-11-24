import getProductsFull from "#app/global-search/utils/getProductsFull.ts";
import ts_categoryFilter from "@/types/ts_categoryFilter";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body: { searchParams: ts_categoryFilter } = await request.json();

  const products = await getProductsFull(body.searchParams);

  return NextResponse.json({ success: null, products });
}
