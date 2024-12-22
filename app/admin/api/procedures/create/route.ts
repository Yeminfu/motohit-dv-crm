import ts_procedure4create from "#app/admin/config/types/ts_procedure4create.js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const json: ts_procedure4create = await request.json();
  return NextResponse.json(json);
}
