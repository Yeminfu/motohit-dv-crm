import dbWorkerShop from "./dbWorkerShop";
import ts_productFromShop from "./ts_productFromShop";

export default async function getPRoductsFromShop(): Promise<ts_productFromShop[]> {
    const [productsFromShop] = await dbWorkerShop(`
      select
          id,
          product_name
      from products
      limit 10
    `, []);
    //@ts-ignore
    return productsFromShop;
}