import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log("data", data);
  return NextResponse.json({ data });
}

const sql = `
  
`;
