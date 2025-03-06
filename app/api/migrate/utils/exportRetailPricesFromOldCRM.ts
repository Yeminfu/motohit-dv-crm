import dbWorker from "@/db/dbWorker2";

export default async function exportRetailPricesFromOldCRM() {
  await dbWorker(`
    insert into motohit_dv_crm.chbfs_retail_prices
    (
      priceValue,
      idShop,
      idProduct,
      idPriceType
    )
    select
      retailPrices.price_count,
      (
        select case
          when retailPrices.shop_id = 'khv' 
            then 2
          when retailPrices.shop_id = 'bir' 
            then 1
          when retailPrices.shop_id = '3'
            then 3 end
      ) as idShop,
      mapping.idProductFromShop,
      (
        select case
          when retailPrices.price_type = 'percent' 
            then 3
          when retailPrices.price_type = 'handle' 
            then 2
          when retailPrices.price_type = 'fix'
            then 1 end
      ) as idPriceType
    from motohit_27_crm.birm_prices retailPrices
      inner join motohit_dv_mapping.products mapping 
      on
        mapping.idProductFromOldCrm = retailPrices.product_id
  `, []);
}