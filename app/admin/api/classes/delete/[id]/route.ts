import { NextRequest, NextResponse } from "next/server";
import ts_class4delete from "./types/ts_class4delete";
import deleteClassFromDB from "./utils/deleteClassFromDB";

export async function POST(request: NextRequest) {
  const jsonFromRequest: ts_class4delete = await request.json();

  const res = await deleteClassFromDB(jsonFromRequest);

  return NextResponse.json(res);
}
