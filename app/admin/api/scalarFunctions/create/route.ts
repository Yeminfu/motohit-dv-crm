import ts_procedure4create from "#app/admin/config/types/ts_procedure4create.ts";
import ts_scalarFunction4create from "#app/admin/config/types/ts_scalarFunction4create.js";
import dbWorker from "#db/dbWorker2.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const scalarFunction: ts_scalarFunction4create = await request.json();
  const resCreate = await DBCreateScalarFunction(scalarFunction);
  if (!resCreate.result) return NextResponse.json(resCreate);

  const insertRes = await DBInsertScalarFunction(scalarFunction);
  return NextResponse.json(insertRes);
}

async function DBCreateScalarFunction(props: ts_procedure4create) {
  return dbWorker(props.SQLString, []);
}

async function DBInsertScalarFunction(props: ts_procedure4create) {
  return dbWorker(
    `
      insert into chbfs_sys$scalarFunctions
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
    [props.name, props.title, props.SQLString]
  );
}
