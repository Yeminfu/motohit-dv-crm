import dbWorker from "#db/dbWorker2.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const classes = await getClasses(data.idConfig);
  return NextResponse.json(classes);
}

async function getClasses(idConfig: number) {
  return dbWorker(
    `
      select * from chbfs_sys$classes where idConfig = ?
    `,
    [idConfig]
  );
}
