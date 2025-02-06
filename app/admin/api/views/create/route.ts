import ts_view4create from "#app/admin/config/types/ts_view4create.ts";
import dbWorker from "#db/dbWorker2.ts";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data: ts_view4create = await request.json();
  const res = await createView(data);
  return NextResponse.json({ data, res });
}

async function createView(props: ts_view4create) {
  const sql = `
    ${props.SQLString};
    insert into chbfs_sys$views
    (name,title,description,idClass,SQLString)
    values
    (?,?,?,?,?)
  `;
  const res = await dbWorker(sql, [
    props.name,
    props.title,
    props.description,
    props.idClass,
    props.SQLString,
  ]);

  return res;
}
