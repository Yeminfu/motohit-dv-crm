import dbWorker from "#db/dbWorker2.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(params: NextRequest) {
  const data = await params.json();
  const result = await dbWorker(data.sql, []);
  return NextResponse.json(result);
}
