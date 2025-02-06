import ts_keys4create from "#app/admin/config/types/ts_keys4create.ts";
import dbWorker from "#db/dbWorker2.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data: ts_keys4create = await request.json();
  const res = await DBCreateKey(data);
  return NextResponse.json(res);
}

async function DBCreateKey(props: ts_keys4create) {
  return dbWorker(
    `
    
    insert into chbfs_sys$keys
    (
      name,
      title,
      tableName,
      description,
      SQLString,
      idConfig
    )
    values
    (
      ?,?,?,?,?,?
    );
    ${props.SQLString};
  `,
    [
      props.name,
      props.title,
      props.tableName,
      props.description,
      props.SQLString,
      props.idConfig,
    ]
  );
}
