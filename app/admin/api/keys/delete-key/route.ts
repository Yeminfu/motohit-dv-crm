import ts_key4delete from "#app/admin/config/types/ts_key4delete.ts";
import dbWorker from "#db/dbWorker2.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data: ts_key4delete = await request.json();
  const res = await deleteKey(data);
  return NextResponse.json(res);
}

async function deleteKey(props: ts_key4delete) {
  const sql = `
    alter table ${props.table}
    drop foreign key ${props.column}
  `;
  const result = await dbWorker(sql, []);
  return result;
}
