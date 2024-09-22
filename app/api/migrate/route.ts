import dbConnection from "@/db/connect";
import { NextResponse } from "next/server";
import createCategoriesTable from "./utils/createCategoriesTable";
import createPriceTypesTable from "./utils/createPriceTypesTable";
import createProductsImagesTable from "./utils/createProductsImagesTable";
import createProductsTable from "./utils/createProductsTable";
import createSalesTable from "./utils/createSalesTable";
import createShopsTable from "./utils/createShopsTable";
import createTokensTable from "./utils/createTokensTable";
import createUsersTable from "./utils/createUsersTable";
import createRetailPricesTable from "./utils/createRetailPricesTable";
import createStockTable from "./utils/createStockTable";
import createSuperuser from "./utils/createSuperuser";
import createHistoryTable from "./utils/createHistoryTable";
import createAttributesTable from "./utils/createAttributesTable";
import createAttributesValuesTable from "./utils/createAttributesValuesTable";

export async function GET() {
  await migrate();
  return NextResponse.json({
    success: null,
  });
}

async function migrate() {
  if (process.env.CAN_MIGRATE !== "poopaloopa") return;
  const connection = await dbConnection();
  await connection.query("SET FOREIGN_KEY_CHECKS=0;");

  await createUsersTable();
  await createTokensTable();
  await createShopsTable();
  await createCategoriesTable();

  await createProductsTable();
  await createProductsImagesTable();

  await createPriceTypesTable();
  await createStockTable();
  await createSalesTable();
  await connection.query("SET FOREIGN_KEY_CHECKS=1;");
  await connection.end();
  await createSuperuser();
  await createRetailPricesTable();
  await createHistoryTable();

  await createAttributesTable();
  await createAttributesValuesTable();
}


