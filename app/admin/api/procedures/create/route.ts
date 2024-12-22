import ts_procedure4create from "#app/admin/config/types/ts_procedure4create.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const procedure: ts_procedure4create = await request.json();
  await DBInsertProcedure(procedure);
  return NextResponse.json(procedure);
}

async function DBInsertProcedure(props: ts_procedure4create) {
  console.log("DBInsertProcedure", props);
}
