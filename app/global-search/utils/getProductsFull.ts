import { ProductsFull } from "#types/products/prodyctType.ts";
import ts_categoryFilter from "#types/ts_categoryFilter.ts";
import getProductImages from "#utils/getProductImages.ts";
import getProductRetailPrices from "#utils/getProductRetailPrices.ts";
import getProductStock from "#utils/getProductStock.ts";
import getProductsByName from "./getProductsByName";

export default async function getProductsFull(
  // idCategory: number,
  searchParams: ts_categoryFilter
): Promise<ProductsFull[]> {
  if (!searchParams.name) return [];

  const products = await getProductsByName(searchParams);

  const productsFull: ProductsFull[] = [];

  for (let index = 0; index < products.length; index++) {
    const product = products[index];
    const images = await getProductImages(product.id);
    const retailPrices = await getProductRetailPrices(product.id);
    const stock = await getProductStock(product.id);
    productsFull.push({
      ...product,
      images,
      retailPrices,
      stock,
    });
  }
  return productsFull;
}
