import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import createProductMainData from "./utils/createProductMainData/createProductMainData";
import { RetailPriceFromDB } from "#types/products/retailPriceFromDB.js";
import createRetailPrices from "./utils/createRetailPrices/createRetailPrices";
import StockFromDBType from "#types/products/stockFromDB.ts";
import insertStock from "./utils/insertStock/insertStock";
import createAttributes from "./utils/createAttributes/createAttributes";
import getUserByToken from "#utils/users/getUserByToken.ts";
import createImages from "./utils/createImages/createImages";
import dbConnection from "#db/connect.ts";

const imagesFolder: string = String(process.env.IMAGES_FOLDER);
fs.mkdirSync(imagesFolder, { recursive: true });

export async function POST(req: NextRequest) {
  const session = Date.now();

  const { cookies } = req;
  const authToken = String(cookies.get("auth")?.value);

  const user = await getUserByToken(authToken);

  if (!user) return NextResponse.json({ success: false, error: 'Ошибка авторизации' });

  const data: any = await req.formData();

  const productMainData = JSON.parse(data.get("productMainData"));

  const connection = await dbConnection();

  try {

    await connection.beginTransaction();

    const idProduct: number = await createProductMainData(
      connection,
      productMainData
    );

    const retail_price: RetailPriceFromDB[] = JSON.parse(
      data.get("retail_price")
    );
    await createRetailPrices(connection, idProduct, retail_price);

    const stock: StockFromDBType[] = JSON.parse(data.get("stock"));
    await insertStock({
      connection,
      stock,
      session,
      idProduct,
      createdBy: user.id
    });

    const attributes = JSON.parse(data.get("attributes"));
    await createAttributes(connection, idProduct, attributes, user.id);

    const images = data.getAll("images");
    await createImages(connection, idProduct, images);

    await connection.commit();
    await connection.end();
    return NextResponse.json({ result: { idProduct } })
  } catch (error) {
    console.error("err #sdf94j", error);
    await connection.rollback();
    await connection.end();
    return NextResponse.json({ error: error })
  }
}
