import ts_booleanField from "#app/attributes/get/[id]/components/types/ts_booleanField.js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const json: ts_booleanField = await req.json();
  return NextResponse.json({
    success: null,
    json
  })
}