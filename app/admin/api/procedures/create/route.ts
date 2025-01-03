import ts_procedure4create from "#app/admin/config/types/ts_procedure4create.ts";
import dbWorker from "#db/dbWorker2.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const procedure: ts_procedure4create = await request.json();
  const resCreate = await DBCreateProcedure(procedure);
  if (!resCreate.result) return NextResponse.json(resCreate);

  const insertRes = await DBInsertProcedure(procedure);
  return NextResponse.json(insertRes);
}

async function DBCreateProcedure(props: ts_procedure4create) {
  return dbWorker(props.SQLString, []);
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
