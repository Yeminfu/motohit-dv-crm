import dbWorker from "#db/dbWorker2.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data: { idClass: number } = await request.json();
  const { idClass } = data;
  const res = await getViewsByIdClass(idClass);
  return NextResponse.json({ res });
}

async function getViewsByIdClass(idClass: number) {
  const sql = `
    
  `;
  const res = await dbWorker(sql, []);
  return res;
}
