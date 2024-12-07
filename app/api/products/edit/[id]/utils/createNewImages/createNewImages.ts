import { ResultSetHeader } from "mysql2";
import saveImage from "#utils/products/saveImage/saveImage.ts";

export default async function createNewImages(
  idProduct: number,
  images: File[]
): Promise<ResultSetHeader[] | undefined> {
  if (!images.length) {
    return;
  }
  return await Promise.all(
    images.map(async (file) => {
      return await saveImage(file, idProduct);
    })
  );
}
