import ts_class4create from "#app/admin/config/types/ts_class4create.ts";
import insertClassToDB from "#app/admin/config/utils/insertClassToDB.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const jsonFromRequest: ts_class4create = await request.json();
  const res = await insertClassToDB(jsonFromRequest);
  return NextResponse.json({ jsonFromRequest, res });
}
