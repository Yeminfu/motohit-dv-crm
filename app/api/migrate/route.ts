import { NextResponse } from "next/server";
import createTables from "./createTables";

export async function GET() {
  await migrate();
  return NextResponse.json({
    success: null,
  });
}

async function migrate() {
  if (process.env.CAN_MIGRATE !== "poopaloopa") return;
  await createTables()
}
