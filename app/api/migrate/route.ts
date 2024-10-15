import { NextResponse } from "next/server";
import createTables from "./createTables";
import dbWorker from "@/db/dbWorker";

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

async function exportCategoriesFromShop() {
  const categoriesFromShop: ts_categoryFromShop[] = await dbWorker(`
    insert into motohit_dv_crm.chbfs_categories
    (
        id,
        category_name,
        slug,
        created_by,
        is_active,
        idParent,
        description,
        position
    )
    select 
      id,
      category_name,
      slug,
      1,
      is_active,
      parent,
      description,
      position
    from motohit_dv.categories
    order by parent is null desc, parent
  `, []).then(x => x[0]);

  console.log('categoriesFromShop', categoriesFromShop);
}

interface ts_categoryFromShop {
  id: number
  slug: string
  is_active: boolean
  parent: number | null
  category_name: string
  description: string | null
  position: string | null
}
