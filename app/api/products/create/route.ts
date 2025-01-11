import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import addHistoryEntry from "@/utils/history/addHistoryEntry";
import createProductMainData from "./utils/createProductMainData/createProductMainData";
import { RetailPriceFromDB } from "#types/products/retailPriceFromDB.js";
import createRetailPrices from "./utils/createRetailPrices/createRetailPrices";
import StockFromDBType from "#types/products/stockFromDB.ts";
import insertStock from "./utils/insertStock/insertStock";
import createAttributes from "./utils/createAttributes/createAttributes";
import getUserByToken from "#utils/users/getUserByToken.ts";
import createImages from "./utils/createImages/createImages";

const imagesFolder: string = String(process.env.IMAGES_FOLDER);
fs.mkdirSync(imagesFolder, { recursive: true });

export async function POST(req: NextRequest) {
  const session = Date.now();

  const { cookies } = req;
  const authToken = String(cookies.get("auth")?.value);

  const user = await getUserByToken(authToken);

  if (!user) return NextResponse.json({ success: false });

  const data: any = await req.formData();

  const productMainData = JSON.parse(data.get("productMainData"));

  const updMainDataRes = await createProductMainData(productMainData);

  let idProduct: number = (() => {
    if (!updMainDataRes) {
      console.error("err #kdf8");
      return 0;
    }
    if (!updMainDataRes.length) {
      console.error("err #kdds84");
      return 0;
    }
    if (!updMainDataRes[1]) {
      console.error("err #dkd93");
      return 0;
    }
    if (!updMainDataRes[1][0]) {
      console.error("err #d93j2j");
      return 0;
    }
    if (!updMainDataRes[1][0].idProduct) {
      console.error("err #d93j2j");
      return 0;
    }

    if (updMainDataRes[1][0].idProduct)
      return Number(updMainDataRes[1][0].idProduct);

    console.error("err #kfs0вл3df84");
    return 0;
  })();

  if (!idProduct) {
    return NextResponse.json({ success: false });
  }

  await addHistoryEntry("createProduct", {
    productMainData,
    updMainDataRes,
  });

  const retail_price: RetailPriceFromDB[] = JSON.parse(
    data.get("retail_price")
  );
  await createRetailPrices(idProduct, retail_price);

  const stock: StockFromDBType[] = JSON.parse(data.get("stock"));
  await insertStock({
    stock,
    session,
    idProduct,
  });

  const attributes = JSON.parse(data.get("attributes"));
  await createAttributes(idProduct, attributes, user.id);

  const images = data.getAll("images");

  await createImages(idProduct, images);

  return NextResponse.json({ success: true });
}
