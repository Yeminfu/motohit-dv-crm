import { ProductsFull } from "@/types/products/prodyctType";
import getProductImages from "./getProductImages";
import getProductRetailPrices from "./getProductRetailPrices";
import getProductStock from "./getProductStock";
import getProductsByCategoryId from "./getProductsByCategoryId";
import ts_categoryFilter from "@/types/ts_categoryFilter";

export default async function getProductsFull(
  idCategory: number,
  searchParams: ts_categoryFilter
): Promise<ProductsFull[]> {
  const products = await getProductsByCategoryId(idCategory, searchParams);

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
