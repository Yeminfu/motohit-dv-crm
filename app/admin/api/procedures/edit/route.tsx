import ts_procedure4Edit from "#app/admin/procedures/[id]/types/ts_procedure4Edit.ts";
import dbWorker from "#db/dbWorker2.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const procedure: ts_procedure4Edit = await request.json();

  const dropRes = await DBDropProcedure(procedure);

  if (dropRes.error) {
    console.error(`err #ksd93cho`);
    return NextResponse.json(dropRes);
  }

  const createRes = await DBCreateProcedure(procedure);
  if (createRes.error) {
    console.error(`err #kfd93`);
    return NextResponse.json(createRes);
  }

  const updateRes = await DBUpdateSQLString(procedure);
  if (createRes.error) {
    console.error(`err #dk84bh`);
    return NextResponse.json(updateRes);
  }

  return NextResponse.json(createRes);
}

async function DBUpdateSQLString(props: ts_procedure4Edit) {
  return dbWorker(
    `
  update chbfs_sys$procedures
  set
    SQLString = ?
  where
    id = ?
  `,
    [props.SQLString, props.id]
  );
}

async function DBCreateProcedure(props: ts_procedure4Edit) {
  return dbWorker(props.SQLString, []);
}

async function DBDropProcedure(props: ts_procedure4Edit) {
  const sql = `drop procedure if exists ${props.name}`;
  return dbWorker(sql, []);
}
