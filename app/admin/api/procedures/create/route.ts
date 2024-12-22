import ts_procedure4create from "#app/admin/config/types/ts_procedure4create.ts";
import dbWorker from "#db/dbWorker2.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const procedure: ts_procedure4create = await request.json();
  const res = await DBInsertProcedure(procedure);
  return NextResponse.json(res);
}

async function DBInsertProcedure(props: ts_procedure4create) {
  return dbWorker(
    `
      insert into chbfs_sys$procedures
      (
        name,
        title,
        SQLString
      )
      values
      (
        ?,?,?
      )
    `,
    [props.procedureName, props.title, props.SQLString]
  );
}
