import ts_column4delete from "#app/admin/classes/types/ts_column4delete.ts";
import dbWorker from "#db/dbWorker2.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data: ts_column4delete = await request.json();
  const response = await dropColumn(data);
  return NextResponse.json(response);
}

async function dropColumn(props: ts_column4delete) {
  const sql = `
    ALTER TABLE ${props.className}
    DROP COLUMN ${props.columnName};
  `;
  return await dbWorker(sql, []);
}
