import ts_product4create from "#types/products/ts_product4create.ts";
import dbWorker from "@/db/dbWorker2";

export default async function handleRetailPrices(
  retailPrices: ts_product4create["retail_price"],
  idProduct: number
) {
  for (let index = 0; index < retailPrices.length; index++) {
    const priceObj = retailPrices[index];
    const { idShop, idPriceType, priceValue } = priceObj;
    await dbWorker(
      `insert into ${process.env.TABLE_PREFIX}_retail_prices (idPriceType, priceValue, idProduct, idShop) values (?, ?, ?, ?)`,
      [idPriceType, priceValue, idProduct, idShop]
    );
  }
}
