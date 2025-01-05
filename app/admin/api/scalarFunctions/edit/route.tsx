// import ts_procedure4create from "#app/admin/config/types/ts_procedure4create.js";
import ts_scalarFunction4Edit from "#app/admin/scalarFunctions/[name]/types/ts_scalarFunction4Edit.js";
import dbWorker from "#db/dbWorker2.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const procedure: ts_scalarFunction4Edit = await request.json();

  const dropRes = await DBDropProcedure(procedure);

  if (dropRes.error) {
    console.error(`err #dajs83`);
    return NextResponse.json(dropRes);
  }

  const createRes = await DBCreateProcedure(procedure);
  if (createRes.error) {
    console.error(`err #ldk3n`);
    return NextResponse.json(createRes);
  }

  const updateRes = await DBUpdateSQLString(procedure);
  if (createRes.error) {
    console.error(`err #d83njr`);
    return NextResponse.json(updateRes);
  }

  return NextResponse.json(createRes);
}

async function DBUpdateSQLString(props: ts_scalarFunction4Edit) {
  return dbWorker(
    `
    update chbfs_sys$scalarFunctions
    set
      SQLString = ?,
      title = ?,
      description = ?,
      idCOnfig = ?,
    `,
    [props.SQLString, props.title, props.description, props.idConfig]
  );
}

async function DBCreateProcedure(props: ts_scalarFunction4Edit) {
  return dbWorker(props.SQLString, []);
}

async function DBDropProcedure(props: ts_scalarFunction4Edit) {
  const sql = `drop function if exists ${props.name}`;
  return dbWorker(sql, []);
}
