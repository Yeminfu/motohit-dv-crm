import { NextResponse } from "next/server";
import createTables from "./createTables";
import { createSubdataFunctions } from "./utils/createSubdataFunctions/createSubdataFunctions";

export async function GET() {
  await migrate();
  await createSubdataFunctions();
  return NextResponse.json({
    success: null,
  });
}

async function migrate() {
  if (process.env.CAN_MIGRATE !== "poopaloopa") return;
  await createTables()
}

