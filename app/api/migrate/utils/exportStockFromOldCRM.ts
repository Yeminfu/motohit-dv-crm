import dbWorker from "@/db/dbWorker";

export default async function exportStockFromOldCRM() {
  await dbWorker(`
    insert into motohit_dv_crm.chbfs_stock
    (
      count,
      idShop,
      idProduct
    )
    select
      stock.count,
      (
        select case
          when stock.shop_id = 'khv' 
            then 2
          when stock.shop_id = 'bir' 
            then 1
          when stock.shop_id = '3'
            then 3 end
      ) as idShop,
      mapping.idProductFromShop
    from motohit_27_crm.birm_stock stock
      inner join motohit_dv_mapping.products mapping 
      on
        mapping.idProductFromOldCrm = stock.product_id
  `, []);
}