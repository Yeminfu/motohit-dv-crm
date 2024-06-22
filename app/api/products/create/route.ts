import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import fs from "fs";
import { ProductOnCreate } from "@/types/products/prodyctType";
import { createProductInDB } from "./createProductInDB";
import getRandomNumber from "@/utils/getRandomNumber";
import createImageInDB from "./createImageInDB";
import checkImageIsExists from "./checkImageIsExists";
import dbConnection from "@/db/connect";
import addHistoryEntry from "@/utils/history/addHistoryEntry";

const imagesFolder: string = String(process.env.IMAGES_FOLDER);
fs.mkdirSync(imagesFolder, { recursive: true });

export async function POST(req: NextRequest) {
  const formData: any = await req.formData();
  const bodyObject: ProductOnCreate = JSON.parse(formData.get("jsonData"));

  const createRes = await createProductInDB(bodyObject);

  if (!createRes.insertId) {
    return NextResponse.json({
      success: false,
      error: createRes.error,
    });
  }

  await handleRetailPrices(bodyObject.retail_price, createRes.insertId);

  await handleStock(bodyObject.stock, createRes.insertId);

  const images = formData.get("images");

  if (images) {
    let filename = slugify(
      images.name.toLocaleLowerCase().replace(/[^ a-zA-Zа-яА-Я0-9-.]/gim, "")
    );

    await createImageInDB(filename, createRes.insertId);

    const imageIsExists = await checkImageIsExists(filename);
    if (imageIsExists) {
      const randomNumber = getRandomNumber(1, 99999);
      filename = randomNumber + filename;
    }

    const buffer = await images.arrayBuffer();
    const filePath = `${imagesFolder}/${filename}`;
    fs.writeFileSync(filePath, Buffer.from(buffer));
  }

  await addHistoryEntry("createProduct", {
    bodyObject,
    createRes,
  });

  return NextResponse.json({
    success: true,
  });
}

async function handleRetailPrices(
  retailPrices: ProductOnCreate["retail_price"],
  idProduct: number
) {
  const connection = await dbConnection();

  for (let index = 0; index < retailPrices.length; index++) {
    const priceObj = retailPrices[index];
    const { idShop, idPriceType, priceValue } = priceObj;
    await connection.query(
      `insert into ${process.env.TABLE_PREFIX}_retail_prices (idPriceType, priceValue, idProduct, idShop) values (?, ?, ?, ?)`,
      [idPriceType, priceValue, idProduct, idShop]
    );
  }

  await connection.end();
}

async function handleStock(stock: ProductOnCreate["stock"], idProduct: number) {
  const connection = await dbConnection();

  for (let index = 0; index < stock.length; index++) {
    const stockObj = stock[index];
    const { idShop, shopName, count } = stockObj;
    await connection.query(
      `insert into ${process.env.TABLE_PREFIX}_stock (idShop, count, idProduct) values (?, ?, ?)`,
      [idShop, count, idProduct]
    );
  }

  await connection.end();
}
