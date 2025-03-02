import dbWorker from "@/db/dbWorker2"

export default async function getStockByProduct(idProduct: number): Promise<{
  id: number
  shopName: string
  count: number
  idProduct: number
  idShop: number
}[]> {
  return await dbWorker(`
      select
        stock.id,
        stock.idProduct,
        stock.idShop,
        stock.count,
        shops.shopName
      from chbfs_stock stock
        left join chbfs_shops shops 
        on 
          shops.id = stock.idShop
      where
        idProduct = ?
    `, [idProduct]).then(x => x.result)
}
