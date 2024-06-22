import { NextResponse } from "next/server";
import updateTokenDeadline from "./updateTokenDeadline";
import deleteUnusedTokens from "./deleteUnusedTokens";

export async function POST(request: Request) {
  const requestData = await request.json();
  await updateTokenDeadline(requestData.token);
  await deleteUnusedTokens();
  return NextResponse.json({ success: true });
}
