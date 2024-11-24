import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import fs from "fs";
import {
  ProductOnCreate,
  ts_attributeToCreate,
} from "@/types/products/prodyctType";
import { createProductInDB } from "./createProductInDB";
import getRandomNumber from "@/utils/getRandomNumber";
import createImageInDB from "./createImageInDB";
import checkImageIsExists from "./checkImageIsExists";
import addHistoryEntry from "@/utils/history/addHistoryEntry";
import handleRetailPrices from "./handleRetailPrices";
import handleStock from "./handleStock";
import dbWorker from "@/db/dbWorker";

const imagesFolder: string = String(process.env.IMAGES_FOLDER);
fs.mkdirSync(imagesFolder, { recursive: true });

export async function POST(req: NextRequest) {
  const formData: any = await req.formData();

  const bodyObject: ProductOnCreate = JSON.parse(formData.get("jsonData"));

  const items: any = Array.from(formData);

  /**
   * создали базу товара
   */
  const createRes = await createProductInDB(bodyObject);

  if (!createRes.insertId) {
    return NextResponse.json({
      success: false,
      error: createRes.error,
    });
  }
  await addHistoryEntry("createProduct", {
    bodyObject,
    createRes,
  });

  /**
   * розн цены
   */
  await handleRetailPrices(bodyObject.retail_price, createRes.insertId);

  /**
   * склад
   */
  await handleStock(bodyObject.stock, createRes.insertId);

  /**
   * картинки
   */
  const images = formData.get("images");

  // if (images) {
  //   await handleImages(createRes.insertId, images)
  // }

  for (let index = 0; index < items.length; index++) {
    const [name, value] = items[index];
    if (value instanceof File) {
      await handleImage(createRes.insertId, value);
    }
  }

  /**
   * атрибуты
   */
  await handleAttributes(createRes.insertId, bodyObject.attributes);

  return NextResponse.json({
    success: true,
  });
}

async function handleAttributes(
  idProduct: number,
  attributesWithValues: ts_attributeToCreate[]
) {
  const values = [];

  for (let index = 0; index < attributesWithValues.length; index++) {
    const element = attributesWithValues[index];
    values.push(element.idAttributeValue);
    values.push(idProduct);
  }

  const qs = `
    insert into ${process.env.TABLE_PREFIX}_attr_prod_relation
    (
      idAttributeValue, idProduct, created_by
    )
    values
      ${attributesWithValues.map((_) => "(?,?,1)")}
  `;

  await dbWorker(qs, values);
}

async function handleImage(idProduct: number, image: any) {
  let filename =
    Date.now() +
    slugify(
      image.name.toLocaleLowerCase().replace(/[^ a-zA-Zа-яА-Я0-9-.]/gim, "")
    );

  await createImageInDB(filename, idProduct);

  const imageIsExists = await checkImageIsExists(filename);
  if (imageIsExists) {
    const randomNumber = getRandomNumber(1, 99999);
    filename = randomNumber + filename;
  } else {
    console.error("err #d83jnf", "файл не создался");
  }

  const buffer = await image.arrayBuffer();
  const filePath = `${imagesFolder}/${filename}`;

  fs.writeFileSync(filePath, Buffer.from(buffer));
}
