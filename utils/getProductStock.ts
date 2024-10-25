import { StockFromDBInterface } from "@/types/products/prodyctType";
import getShops from "./getShops";
import dbWorker from "@/db/dbWorker";


export default async function getProductStock(idProduct: any): Promise<(StockFromDBInterface | null)[]> {
  const shops = await getShops();
  const res = await Promise.all(
    shops.map(async (shop) => {
      const [stockItem]: StockFromDBInterface[] = await dbWorker(`
        select 
          id,
          idProduct,
          idShop,
          count
        from chbfs_stock
        where
          idProduct = ?
          and idShop = ?
      `, [idProduct, shop.id]);

      if (!stockItem) return null;

      return {
        id: stockItem.id,
        idShop: shop.id,
        shopName: shop.shopName,
        count: stockItem.count
      }
    })
  )

  return res;
}
