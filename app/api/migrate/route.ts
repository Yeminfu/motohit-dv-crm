import { NextResponse } from "next/server";
import createTables from "./createTables";
import dbWorker from "@/db/dbWorker";
import exportCategoriesFromShop from "./utils/exportCategoriesFromShop";

export async function GET() {
  await migrate();
  await exportCategoriesFromShop();
  // await createSubdataFunctions();
  return NextResponse.json({
    success: null,
  });
}

async function migrate() {
  if (process.env.CAN_MIGRATE !== "poopaloopa") return;
  await createTables()
}

// interface ts_categoryFromShop {
//   id: number
//   slug: string
//   is_active: boolean
//   parent: number | null
//   category_name: string
//   description: string | null
//   position: string | null
// }
