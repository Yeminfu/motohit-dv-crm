import { ts_imageFromDB } from "#types/products/ts_imageFromDB.ts";
import { ResultSetHeader } from "mysql2";
import deleteImages from "./deleteImages";

export default async function editOldImages(
  idProduct: number,
  images: ts_imageFromDB[]
): Promise<ResultSetHeader | undefined> {
  if (!images.length) {
    return;
  }

  const ids = images.map((img) => img.id);
  return await deleteImages(idProduct, ids);
}
