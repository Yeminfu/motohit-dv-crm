import getProductImages from "@/utils/getProductImages";
import getProductRetailPrices from "@/utils/getProductRetailPrices";
import getProductStock from "@/utils/getProductStock";
import getFullProductFromDB from "@/utils/products/getFullPRoductById/getFullPRoductFromDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, params: any) {
  const [product] = await getFullProductFromDB(1);

  const images = await getProductImages(product.id);
  const retailPrices = await getProductRetailPrices(product.id);
  const stock = await getProductStock(product.id);

  const productFull = {
    ...product,
    retailPrices,
    images,
    stock,
  };

  return NextResponse.json({ product: productFull });
}
