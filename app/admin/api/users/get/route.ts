import getAllUsers from "@/app/users/getAllUsers";
import { NextResponse } from "next/server";

export async function POST() {
  const users = await getAllUsers();
  return NextResponse.json({
    users
  })
}