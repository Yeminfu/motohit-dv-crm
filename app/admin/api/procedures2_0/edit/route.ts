import dbWorker from "@/db/dbWorker2";
import { NextRequest, NextResponse } from "next/server";

interface ts_inputData {
  name: string
  body: string
  header: string

}

export async function POST(request: NextRequest) {
  const procedure: ts_inputData = await request.json();
  const sql = `
    drop procedure if exists ${procedure.name};
    ${procedure.header}
    ${procedure.body}
  `;
  const res = await dbWorker(sql, []);

  return NextResponse.json(res);
}
