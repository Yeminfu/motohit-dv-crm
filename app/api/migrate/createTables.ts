import dbConnection from "@/db/connect";
import createAttrProdRelationsTable from "./utils/createAttrProdRelationsTable";
import createAttributesTable from "./utils/createAttributesTable";
import createAttributesValuesTable from "./utils/createAttributesValuesTable";
import createCategoriesTable from "./utils/createCategoriesTable";
import createHistoryTable from "./utils/createHistoryTable";
import createPriceTypesTable from "./utils/createPriceTypesTable";
import createProductsImagesTable from "./utils/createProductsImagesTable";
import createProductsTable from "./utils/createProductsTable";
import createRetailPricesTable from "./utils/createRetailPricesTable";
import createSalesTable from "./utils/createSalesTable";
import createShopsTable from "./utils/createShopsTable";
import createStockTable from "./utils/createStockTable";
import createSuperuser from "./utils/createSuperuser";
import createTokensTable from "./utils/createTokensTable";
import createUsersTable from "./utils/createUsersTable";

export default async function createTables() {
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
    await createAttrProdRelationsTable();
}