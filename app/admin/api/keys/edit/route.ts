import ts_keyFromDB from "#app/admin/config/types/ts_keyFromDB.ts";
import dbWorker from "#db/dbWorker2.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data: ts_keyFromDB = await request.json();
  const res = await editKey(data);
  return NextResponse.json({ data, res });
}

async function editKey(key: ts_keyFromDB) {
  const sql = `
    alter table 
  `;
  const res = await dbWorker(sql, []);
  return res;
}
