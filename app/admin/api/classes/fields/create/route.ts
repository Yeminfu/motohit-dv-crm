import ts_column4create from "#app/admin/classes/types/ts_column4create.js";
import dbWorker from "#db/dbWorker2.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data: ts_column4create = await request.json();
  const res = await createField(data);
  return NextResponse.json(res);
}

async function createField(params: ts_column4create) {
  const type = (() => {
    if (params.column.DATA_TYPE === "varchar")
      return `${params.column.DATA_TYPE}(${params.column.CHARACTER_MAXIMUM_LENGTH})`;
    return params.column.DATA_TYPE;
  })();

  const sql = `
    alter table ${params.className}
    add column ${params.column.COLUMN_NAME} ${type};
  `;
  return await dbWorker(sql, []);
}
