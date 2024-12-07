import dbWorker from "#db/dbWorker.ts";
import { ResultSetHeader } from "mysql2";

export default async function deleteImages(
  idProduct: number,
  ids: number[]
): Promise<ResultSetHeader> {
  const sql = `
    delete from ${process.env.TABLE_PREFIX}_products_images
    where
      idProduct = ?
      and id not in (
        ${ids.map(() => "?")}
      )
  `;

  const res = await dbWorker(sql, [idProduct, ...ids]);
  return res;
}
