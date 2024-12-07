import slugify from "slugify";
import insertImageToDB from "./insertImageToDB";
import fs from "fs";

const imagesFolder: string = String(process.env.IMAGES_FOLDER);

export default async function saveImage(file: File, idProduct: number) {
  const dateNow = Date.now();

  const filename = slugify(
    file.name.toLocaleLowerCase().replace(/[^ a-zA-Zа-яА-Я0-9-.]/gim, "")
  ).replace(".", dateNow + ".");

  const buffer = await file.arrayBuffer();
  const filePath = `${imagesFolder}/${filename}`;

  fs.writeFileSync(filePath, Buffer.from(buffer));

  return await insertImageToDB(filename, idProduct);
}
