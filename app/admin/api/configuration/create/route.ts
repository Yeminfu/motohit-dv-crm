import { NextRequest, NextResponse } from "next/server";
import insertInDB from "./utils/insertInDB";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const res = await insertInDB(data);
  return NextResponse.json(res);
}
