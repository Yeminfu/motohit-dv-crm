import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data: ts_class4create = await request.json();
  console.log(data.className);

  return NextResponse.json(data);
}

interface ts_class4create {
  className: string;
}
