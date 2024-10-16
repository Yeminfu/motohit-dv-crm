import { NextResponse } from "next/server";
import createTables from "./createTables";
import exportCategoriesFromShop from "./utils/exportCategoriesFromShop";
import exportAttributesFromShop from "./utils/exportAttributesFromShop";
import exportProductsFromShop from "./utils/exportProductsFromShop";
import exportAttributesValuesFromShop from "./utils/exportAttributesValuesFromShop";
import exportAttrProdRelationsFromShop from "./utils/exportAttrProdRelationsFromShop";
import exportProductsImagesFromShop from "./utils/exportProductsImagesFromShop";
import exportStockFromOldCRM from "./utils/exportStockFromOldCRM";
import exportRetailPricesFromOldCRM from "./utils/exportRetailPricesFromOldCRM";

export async function GET() {
  await migrate();
  await exportCategoriesFromShop();
  await exportAttributesFromShop();
  await exportAttributesValuesFromShop();
  await exportProductsFromShop();
  await exportAttrProdRelationsFromShop();
  await exportProductsImagesFromShop();
  await exportStockFromOldCRM();
  await exportRetailPricesFromOldCRM();
  return NextResponse.json({
    success: null,
  });
}

async function migrate() {
  if (process.env.CAN_MIGRATE !== "poopaloopa") return;
  await createTables()
}
