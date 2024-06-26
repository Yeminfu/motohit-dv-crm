import { NextRequest, NextResponse } from "next/server";
import { updateProduct } from "./updateProduct";
import { RetailPriceFromDB } from "@/types/products/retailPriceFromDB";
import updateRetailPrice from "./updateRetailPrice";

export async function POST(
  req: NextRequest,
  params: { params: { id: string } }
) {
  const data: any = await req.formData();

  const mainProductFields = JSON.parse(data.get("mainProductFields"));
  const retail_price: RetailPriceFromDB[] = JSON.parse(
    data.get("retail_price")
  );

  for (let index = 0; index < retail_price.length; index++) {
    const retailPriceObj = retail_price[index];
    const updRes = await updateRetailPrice(retailPriceObj);
    console.log("updRes", updRes);
  }

  await updateProduct(mainProductFields);

  return NextResponse.json({ success: null });
}
