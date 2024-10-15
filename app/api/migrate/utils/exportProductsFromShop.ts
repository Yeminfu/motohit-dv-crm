import dbWorker from "@/db/dbWorker";

export default async function exportProductsFromShop() {
    const categoriesFromShop = await dbWorker(`
      insert into motohit_dv_crm.chbfs_products
      (
        id,
        name,
        idCategory,
        purchase_price,
        idCostPriceType,
        costPriceValue,
        color,
        code,
        note,
        isArchived
      )
      select 
        id,
        product_name,
        category,
        100,
        1,
        1,
        'green',
        'code',
        'note',
        0
      from motohit_dv.products;
  `, []).then(x => x[0]);

    console.log('categoriesFromShop', categoriesFromShop);
}
