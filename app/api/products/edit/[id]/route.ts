import { NextResponse } from "next/server";
import { RetailPriceFromDB } from "@/types/products/retailPriceFromDB";
import updateRetailPrice from "./utils/editRetailPrices/updateRetailPrice";
import StockFromDBType from "@/types/products/stockFromDB";
import updateStock from "./updateStock";
import addHistoryEntry from "@/utils/history/addHistoryEntry";
import updateProductMainData from "./updateProductMainData";
import insertRetailPrice from "./utils/editRetailPrices/insertRetailPrice";
import insertStock from "./insertStock";
import editProductAttributes from "./utils/editProductAttributes/editProductAttributes";

export async function POST(req: any, params: { params: { id: any } }) {
  const session = Date.now();

  const data: any = await req.formData();

  const mainProductFields = JSON.parse(data.get("mainProductFields"));

  const retail_price: RetailPriceFromDB[] = JSON.parse(
    data.get("retail_price")
  );

  try {
    const updMainDataRes = await updateProductMainData(
      mainProductFields,
      Number(params.params.id)
    );
    await addHistoryEntry("updateProductMainData", {
      mainProductFields,
      updMainDataRes,
    });
  } catch (error) {
    console.error("fatal error #mfn5c", error);
  }

  for (let index = 0; index < retail_price.length; index++) {
    const retailPriceObj = retail_price[index];
    if (retailPriceObj.idRecord) {
      const updRetailPriceRes = await updateRetailPrice(retailPriceObj);
      await addHistoryEntry("updateProductRetailPrice", {
        retailPriceObj,
        updRetailPriceRes,
      });
    } else {
      const insertRetailPriceRes = await insertRetailPrice(retailPriceObj);
      await addHistoryEntry("insertProductRetailPrice", {
        retailPriceObj,
        insertRetailPriceRes,
      });
    }
  }

  const stock: StockFromDBType[] = JSON.parse(data.get("stock"));
  for (let index = 0; index < stock.length; index++) {
    const stockObj = stock[index];
    if (stockObj.idRecord) {
      const updRes = await updateStock(stockObj, params.params.id);
      await addHistoryEntry("updateStock", { session, stockObj, updRes });
    } else {
      const insertRes = await insertStock(stockObj, params.params.id);
      await addHistoryEntry("insertStock", { session, stockObj, insertRes });
    }
  }

  const attributes = JSON.parse(data.get("attributes"));

  await editProductAttributes(mainProductFields.id, attributes);

  return NextResponse.json({ success: true });
}
