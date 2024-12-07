import slugify from "slugify";
import fs from "fs";

const imagesFolder: string = String(process.env.IMAGES_FOLDER);

export default async function createNewImages(images: File[]) {
  for (let index = 0; index < images.length; index++) {
    const file = images[index];
    console.log(file);

    const dateNow = Date.now();

    const filename = slugify(
      file.name.toLocaleLowerCase().replace(/[^ a-zA-Zа-яА-Я0-9-.]/gim, "")
    ).replace(".", dateNow + ".");

    const buffer = await file.arrayBuffer();
    const filePath = `${imagesFolder}/${filename}`;

    fs.writeFileSync(filePath, Buffer.from(buffer));
    // await insertImageToDB(filename, Number(productId));
  }
}
