// import dbConnection from "@/db/connect";
import createCategory from "@/db/crud/createCategory";
import { ts_categoryToRequestCreate } from "@/types/categories/categories";
// import addHistoryEntry from "@/utils/history/addHistoryEntry";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { category_name, description, idParent }: ts_categoryToRequestCreate = body;
  
  const res = await createCategory(category_name, String(description), idParent);
  return NextResponse.json(res);
}
