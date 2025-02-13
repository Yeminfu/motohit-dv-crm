import dbWorker from "@/db/dbWorker2";
import ts_inputs from "@/app/attributes/get/[id]/components/attributeValueCreator/types/ts_inputs";
import { NextRequest, NextResponse } from "next/server";
import createAttributeValue from "./utils/createAttributeValue";

export async function POST(request: NextRequest) {
  const data: ts_inputs = await request.json();
  const res = await createAttributeValue(data)
  return NextResponse.json(res)
}
