import { NextResponse } from "next/server";
import createTables from "./createTables";
import exportCategoriesFromShop from "./utils/exportCategoriesFromShop";
import exportAttributesFromShop from "./utils/exportAttributesFromShop";
import exportProductsFromShop from "./utils/exportProductsFromShop";
import exportAttributesValuesFromShop from "./utils/exportAttributesValuesFromShop";
import exportAttrProdRelationsFromShop from "./utils/exportAttrProdRelationsFromShop";
import exportProductsImagesFromShop from "./utils/exportProductsImagesFromShop";

export async function GET() {
  await migrate();
  await exportCategoriesFromShop();
  await exportAttributesFromShop();
  await exportAttributesValuesFromShop();
  await exportProductsFromShop();
  await exportAttrProdRelationsFromShop();
  await exportProductsImagesFromShop();
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
