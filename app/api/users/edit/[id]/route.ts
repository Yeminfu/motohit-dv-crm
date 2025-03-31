import { NextRequest, NextResponse } from "next/server";
import editUser from "./utils/editUser";

export async function POST(request: NextRequest, params: { params: { id: string } }) {
  const data = await request.json();
  const res = await editUser(Number(params.params.id), data)
  return NextResponse.json(res);
}