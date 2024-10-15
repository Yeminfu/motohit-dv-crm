import dbWorker from "@/db/dbWorker";

export default async function exportCategoriesFromShop() {
    const categoriesFromShop = await dbWorker(`
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
