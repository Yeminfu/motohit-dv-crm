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

  let idProduct = Number();

  try {
    const updMainDataRes = await createProductMainData(productMainData);

    if (updMainDataRes.insertId) idProduct = updMainDataRes.insertId;

    await addHistoryEntry("createProduct", {
      productMainData,
      updMainDataRes,
    });
  } catch (error) {
    console.error("err #mfn5c", error);
    return NextResponse.json({ success: false });
  }

  const retail_price: RetailPriceFromDB[] = JSON.parse(
    data.get("retail_price")
  );
  await createRetailPrices(idProduct, retail_price);

  const stock: StockFromDBType[] = JSON.parse(data.get("stock"));
  // const stockRes =
  await insertStock({
    stock,
    session,
    idProduct,
  });

  const attributes = JSON.parse(data.get("attributes"));
  // const createAttributesRes =
  await createAttributes(idProduct, attributes, user.id);

  const images = data.getAll("images");

  // const createImagesRes =
  await createImages(idProduct, images);

  return NextResponse.json({ success: true });
}
