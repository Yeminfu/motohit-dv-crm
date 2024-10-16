import dbWorker from "@/db/dbWorker";

export default async function exportProductsImagesFromShop() {
    const categoriesFromShop = await dbWorker(`
      insert into motohit_dv_crm.chbfs_products_images
      (
        id,
        name,
        idProduct,
        isMain
      )
      select
        max(id) as id, 
        name, 
        MAX(essense_id) as essense_id, 
        MAX(is_main) as is_main
      from motohit_dv.media
      where
        essense_id in (
          select id from motohit_dv_crm.chbfs_products
        )
      group by name;
  `, []).then(x => x[0]);

    console.log('categoriesFromShop', categoriesFromShop);
}
