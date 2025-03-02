import { NextResponse } from "next/server";
import createTables from "./createTables";
import exportCategoriesFromShop from "./utils/exportCategoriesFromShop";
import exportAttributesFromShop from "./utils/exportAttributesFromShop";
import exportProductsFromShop from "./utils/exportProductsFromShop";
import exportAttributesValuesFromShop from "./utils/exportAttributesValuesFromShop";
import exportAttrProdRelationsFromShop from "./utils/exportAttrProdRelationsFromShop";
import exportProductsImagesFromShop from "./utils/exportProductsImagesFromShop";
// import exportStockFromOldCRM from "./utils/exportStockFromOldCRM";
// import exportRetailPricesFromOldCRM from "./utils/exportRetailPricesFromOldCRM";
import dbWorker from "@/db/dbWorker2";

export async function GET() {
  await migrate();

  return NextResponse.json({
    success: null,
  });
}

async function migrate() {
  if (process.env.CAN_MIGRATE !== "poopaloopa") return;

  await deleteForeignKeys();
  await deleteTables();
  await createTables();

  await exportCategoriesFromShop();
  await exportAttributesFromShop();
  await exportAttributesValuesFromShop();
  await exportProductsFromShop();
  await exportAttrProdRelationsFromShop();
  await exportProductsImagesFromShop();
  // await exportStockFromOldCRM();
  // await exportRetailPricesFromOldCRM();
}

async function deleteForeignKeys() {
  const qs = `
    SELECT 
      TABLE_NAME AS 'Table',
      CONSTRAINT_NAME AS 'ForeignKey'
    FROM 
      INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    WHERE 
      REFERENCED_TABLE_SCHEMA = 'motohit_dv_crm';
  `;
  const foreignKeys = await dbWorker(qs, []).then(x => x.result);

  for (let index = 0; index < foreignKeys.length; index++) {
    const element = foreignKeys[index];
    const res2 = await dbWorker(
      `
      ALTER TABLE ${element.Table}
        DROP FOREIGN KEY ${element.ForeignKey};
    `,
      []
    );
  }
}

async function deleteTables() {
  const qs = `
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'motohit_dv_crm';
  `;
  const tables = await dbWorker(qs, []).then(x => x.result);

  // TABLE_NAME
  for (let index = 0; index < tables.length; index++) {
    const table = tables[index];
    const res2 = await dbWorker(
      `
      DROP TABLE ${table.TABLE_NAME};
    `,
      []
    );
  }
}
