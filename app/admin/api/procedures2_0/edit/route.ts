import dbWorker from "@/db/dbWorker2";
import { NextRequest, NextResponse } from "next/server";

interface ts_inputData {
  name: string
  body: string
}

export async function POST(request: NextRequest) {
  const procedure: ts_inputData = await request.json();
  const sql = `
    drop procedure if exists ${procedure.name};
    create procedure ${procedure.name} (
      in value varchar(250)
    ) 
    ${procedure.body}
  `;
  const res = await dbWorker(sql, []);

  return NextResponse.json(res);
}
