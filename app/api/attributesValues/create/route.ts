import ts_inputs from "@/app/attributes/get/[id]/components/attributeValueCreator/types/ts_inputs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data: ts_inputs = await request.json();
  return NextResponse.json({
    data
  })
}