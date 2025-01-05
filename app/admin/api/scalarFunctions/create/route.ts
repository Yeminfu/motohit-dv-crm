import ts_scalarFunction4create from "#app/admin/config/types/ts_scalarFunction4create.ts";
import dbWorker from "#db/dbWorker2.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const scalarFunction: ts_scalarFunction4create = await request.json();
  const resCreate = await DBCreateScalarFunction(scalarFunction);
  return NextResponse.json(resCreate);
}

async function DBCreateScalarFunction(props: ts_scalarFunction4create) {
  return dbWorker(
    `
    ${props.SQLString};
    insert into chbfs_sys$scalarFunctions
    (
      name,
      title,
      description,
      SQLString,
      idConfig
    )
    values
    (
      ?,?,?,?,?
    )
  `,
    [
      props.name,
      props.title,
      props.description,
      props.SQLString,
      props.idConfig,
    ]
  );
}
