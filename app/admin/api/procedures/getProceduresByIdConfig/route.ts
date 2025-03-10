import dbWorker from "#db/dbWorker2.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const { idConfig } = data;

  const procedures = await getProcedures(idConfig);

  if (procedures.result) {
    return NextResponse.json({ procedures: procedures.result })
  }

  return NextResponse.json({
    error: procedures.error
  })
}

async function getProcedures(idConfig: number) {
  const sql = `
    select
      *
    from chbfs_sys$procedures
    where idCOnfig = ?
  `;
  const res = await dbWorker(sql, idConfig);
  return res;
}
