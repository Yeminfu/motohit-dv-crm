import dbWorker from "@/db/dbWorker";

export default async function exportAttributesFromShop() {
    const categoriesFromShop = await dbWorker(`
      insert into motohit_dv_crm.chbfs_attributes
      (
        id,
        attribute_name,
        created_date,
        created_by,
        idCategory,
        view_in_filter,
        isOpenInFilter,
        is_main
      )
      
      select 
        id,
        attribute_name,
        created_date,
        1,
        category,
        view_in_filter,
        is_open_in_filter,
        is_main
      from motohit_dv.attributes
  `, []).then(x => x[0]);

    console.log('categoriesFromShop', categoriesFromShop);
}
