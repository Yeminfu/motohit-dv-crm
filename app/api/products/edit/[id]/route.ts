import { NextResponse } from "next/server";
import { RetailPriceFromDB } from "@/types/products/retailPriceFromDB";
import StockFromDBType from "@/types/products/stockFromDB";
import addHistoryEntry from "@/utils/history/addHistoryEntry";
import updateProductMainData from "./updateProductMainData";
import editProductAttributes from "./utils/editProductAttributes/editProductAttributes";
import editRetailPrices from "./utils/editRetailPrices/editRetailPrices";
import editStock from "./utils/editStock/editStock";

export async function POST(req: any, params: { params: { id: any } }) {
  const session = Date.now();

  const data: any = await req.formData();

  const mainProductFields = JSON.parse(data.get("mainProductFields"));

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
    return NextResponse.json({ success: false });
  }

  const retail_price: RetailPriceFromDB[] = JSON.parse(
    data.get("retail_price")
  );
  await editRetailPrices(retail_price);

  const stock: StockFromDBType[] = JSON.parse(data.get("stock"));
  await editStock({
    stock,
    session,
    idProduct: params.params.id,
  });

  const attributes = JSON.parse(data.get("attributes"));
  await editProductAttributes(mainProductFields.id, attributes);

  return NextResponse.json({ success: true });
}
