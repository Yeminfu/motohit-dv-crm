import { ts_imageFromDB } from "#types/products/ts_imageFromDB.ts";
import { ResultSetHeader } from "mysql2";
import deleteImages from "./deleteImages";

export default async function editOldImages(
  connection: any,
  idProduct: number,
  images: ts_imageFromDB[]
): Promise<ResultSetHeader | undefined> {
  const ids = images.map((img) => img.id);
  return await deleteImages(connection, idProduct, ids);
}
