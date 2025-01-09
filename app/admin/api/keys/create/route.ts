import ts_keys4create from "#app/admin/config/types/ts_keys4create.js";
import dbWorker from "#db/dbWorker2.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data: ts_keys4create = await request.json();
  const res = await DBCreateKey(data);
  return NextResponse.json({ data, res });
}

async function DBCreateKey(props: ts_keys4create) {
  return dbWorker(
    `
    ${props.SQLString};
    insert into chbfs_sys$keys
    (
      name,
      title,
      description,
      SQLString
    )
    values
    (
      ?,?,?,?
    )
  `,
    [props.name, props.title, props.description, props.SQLString]
  );
}
