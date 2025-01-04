import ts_procedure4create from "#app/admin/config/types/ts_procedure4create.js";
import dbWorker from "#db/dbWorker2.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const procedure: ts_procedure4create = await request.json();

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

async function DBUpdateSQLString(props: ts_procedure4create) {
  return dbWorker(
    `
  update chbfs_sys$procedures
  set
    SQLString = ?
  
  `,
    [props.SQLString]
  );
}

async function DBCreateProcedure(props: ts_procedure4create) {
  return dbWorker(props.SQLString, []);
}

async function DBDropProcedure(props: ts_procedure4create) {
  const sql = `drop procedure if exists ${props.name}`;
  return dbWorker(sql, []);
}
