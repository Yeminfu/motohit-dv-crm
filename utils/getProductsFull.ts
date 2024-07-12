import { ProductsFull } from "@/types/products/prodyctType";
import getProductImages from "./getProductImages";
import getProductRetailPrices from "./getProductRetailPrices";
import getProductStock from "./getProductStock";
import getProductsByCategoryId from "./getProductsByCategoryId";
import getShops from "./getShops";

export default async function getProductsFull(
  idCategory: number
): Promise<ProductsFull[]> {
  const products = await getProductsByCategoryId(idCategory);
  const shops = await getShops();
  const productsFull: ProductsFull[] = await Promise.all(
    products.map(async (product) => {
      const images = await getProductImages(product.id);
      const retailPrices = await getProductRetailPrices(product.id);
      const stock = await getProductStock(product.id);
      return {
        ...product,
        images,
        retailPrices,
        stock,
      };
    })
  );
  return productsFull;
}
