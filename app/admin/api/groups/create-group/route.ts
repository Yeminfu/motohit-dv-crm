import dbWorker from "@/db/dbWorker2";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name } = await request.json();
  const sql = `
    insert into chbfs_sys$groups
    (name)
    values
    (?)
  `;
  const result = await dbWorker(sql, [name])
  return NextResponse.json(result)
}
