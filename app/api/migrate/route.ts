import { NextResponse } from "next/server";
import createTables from "./createTables";
// import dbWorker from "@/db/dbWorker";
import exportCategoriesFromShop from "./utils/exportCategoriesFromShop";
import exportAttributesFromShop from "./utils/exportAttributesFromShop";
import exportProductsFromShop from "./utils/exportProductsFromShop";

export async function GET() {
  await migrate();
  await exportCategoriesFromShop();
  await exportAttributesFromShop();
  await exportProductsFromShop();
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
