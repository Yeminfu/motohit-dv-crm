import { NextResponse } from "next/server";
// import updateProduct from "./updateProduct";
import { RetailPriceFromDB } from "@/types/products/retailPriceFromDB";
import updateRetailPrice from "./updateRetailPrice";
import StockFromDBType from "@/types/products/stockFromDB";
import updateStock from "./updateStock";
import addHistoryEntry from "@/utils/history/addHistoryEntry";
import updateProductMainData from "./updateProductMainData";
import insertRetailPrice from "./insertRetailPrice";
import insertStock from "./insertStock";
import editProductAttributes from "./utils/editProductAttributes/editProductAttributes";

export async function POST(req: any, params: { params: { id: any } }) {
  const session = Date.now();

  const data: any = await req.formData();
  // console.log('params', params);
  // console.log('req', req.params);

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
    console.log("fatal error #mfn5c", error);
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

  // for (let index = 0; index < retail_price.length; index++) {
  //   const retailPriceObj = retail_price[index];
  //   const updRes = await updateRetailPrice(retailPriceObj);

  //   if (updRes.code) {
  //     errors.push({ action: "update_retail_price", code: updRes.code });
  //   }
  //   if (updRes.changedRows) {
  //     await addHistoryEntry("updateRetailPrice", {
  //       session,
  //       ...mainProductFields,
  //     });
  //   }
  // }

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
  // console.log("attributeObj", attributeObj);
  // console.log("mainProductFields", mainProductFields);

  await editProductAttributes(mainProductFields.id, attributes);

  // const updProductRes = await updateProduct(mainProductFields);
  // if (updProductRes.code) {
  //   errors.push({ action: "update_product", code: updProductRes.code });
  // }
  // if (updProductRes.changedRows) {
  //   await addHistoryEntry("updateProduct", { session, ...mainProductFields });
  // }

  // if (errors.length) {
  //   await addHistoryEntry("sql_error", { session, errors });
  //   return NextResponse.json({ success: false, errors });
  // }

  return NextResponse.json({ success: true });
}
