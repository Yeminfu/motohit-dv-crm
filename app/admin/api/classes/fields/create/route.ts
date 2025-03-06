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

  const defaultType = (() => {
    const v = params.column.COLUMN_DEFAULT;
    if (typeof v == 'undefined') return '';
    if (/^-?\d+$/.test(v)) return 'default ' + v;
    if (typeof v == 'string') return "default '" + v + "'";
  })();

  const sql = `
    alter table ${params.className}
    add column ${params.column.COLUMN_NAME}
    ${type}
    ${defaultType}/*2*/
    ${(Number(params.column.IS_NULLABLE) === 1) ? 'null' : 'not null'}/*1*/
  `;
  return await dbWorker(sql, []);
}
