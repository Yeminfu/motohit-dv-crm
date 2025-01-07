import ts_view4edit from "#app/admin/views/types/ts_view4edit.ts";
import dbWorker from "#db/dbWorker2.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const procedure: ts_view4edit = await request.json();

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

async function DBUpdateSQLString(props: ts_view4edit) {
  return dbWorker(
    `
  update chbfs_sys$views
  set
    SQLString = ?,
    title = ?,
    description = ?  
  where
    name = ?
  `,
    [props.SQLString, props.title, props.description, props.name]
  );
}

async function DBCreateProcedure(props: ts_view4edit) {
  return dbWorker(props.SQLString, []);
}

async function DBDropProcedure(props: ts_view4edit) {
  const sql = `drop view if exists ${props.name}`;
  console.log("sql", sql);

  return dbWorker(sql, []);
}
