import dbWorker from "@/db/dbWorker"

export default async function getProductRetailPrices(idProduct: number): Promise<{
    id: number
    created_date: Date
    idPriceType: number
    priceValue: number
    idProduct: number
    idShop: number
    shopName: string
}[]> {
    return await dbWorker(`
      select
        prices.*,
        shops.shopName
      from chbfs_retail_prices prices
        left join chbfs_shops shops 
        on 
          shops.id = prices.idShop
      where idProduct = ?
    `, [idProduct])
}