import dbWorker from "#db/dbWorker.ts";
import { ResultSetHeader } from "mysql2";

export default async function insertImageToDB(
  filename: string,
  idProduct: number
): Promise<ResultSetHeader> {
  const sql = `
    insert into ${process.env.TABLE_PREFIX}_products_images
    (
      name, idProduct
    )
    values
    (
      ?,?
    )
  `;
  const res = await dbWorker(sql, [filename, idProduct]);
  return res;
}
