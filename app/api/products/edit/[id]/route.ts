import { NextRequest, NextResponse } from "next/server";
import updateProduct from "./updateProduct";
import { RetailPriceFromDB } from "@/types/products/retailPriceFromDB";
import updateRetailPrice from "./updateRetailPrice";
import StockFromDBType from "@/types/products/stockFromDB";
import updateStock from "./updateStock";
import addHistoryEntry from "@/utils/history/addHistoryEntry";

export async function POST(
  req: NextRequest,
  params: { params: { id: string } }
) {
  const session = Date.now();

  const errors: { action: string; code: string }[] = [];

  const data: any = await req.formData();

  const mainProductFields = JSON.parse(data.get("mainProductFields"));

  const retail_price: RetailPriceFromDB[] = JSON.parse(
    data.get("retail_price")
  );

  for (let index = 0; index < retail_price.length; index++) {
    const retailPriceObj = retail_price[index];
    const updRes = await updateRetailPrice(retailPriceObj);

    if (updRes.code) {
      errors.push({ action: "update_retail_price", code: updRes.code });
    }
    if (updRes.changedRows) {
      await addHistoryEntry("updateRetailPrice", {
        session,
        ...mainProductFields,
      });
    }
  }

  const stock: StockFromDBType[] = JSON.parse(data.get("stock"));
  for (let index = 0; index < stock.length; index++) {
    const stockObj = stock[index];
    const updRes = await updateStock(stockObj);
    if (updRes.code) {
      errors.push({ action: "update_stock", code: updRes.code });
    }
    if (updRes.changedRows) {
      await addHistoryEntry("updateStock", { session, ...mainProductFields });
    }
  }

  const updProductRes = await updateProduct(mainProductFields);
  if (updProductRes.code) {
    errors.push({ action: "update_product", code: updProductRes.code });
  }
  if (updProductRes.changedRows) {
    await addHistoryEntry("updateProduct", { session, ...mainProductFields });
  }

  if (errors.length) {
    await addHistoryEntry("sql_error", { session, errors });
    return NextResponse.json({ success: false, errors });
  }

  return NextResponse.json({ success: true });
}
