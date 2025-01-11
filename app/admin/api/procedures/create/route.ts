import ts_procedure4create from "#app/admin/config/types/ts_procedure4create.ts";
import dbWorker from "#db/dbWorker2.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const procedure: ts_procedure4create = await request.json();

  const resCreate = await DBCreateProcedure(procedure);
  if (!resCreate.result) {
    console.error("err #dsdf8", resCreate);
    return NextResponse.json(resCreate);
  }

  return NextResponse.json(resCreate);
}

async function DBCreateProcedure(props: ts_procedure4create) {
  return dbWorker(
    `
    insert into chbfs_sys$procedures
    (
      name,
      title,
      SQLString,
      idConfig
    )
    values
    (
      ?,?,?,?
    );

    ${props.SQLString};

  `,
    [props.name, props.title, props.SQLString, props.idConfig]
  );
}
