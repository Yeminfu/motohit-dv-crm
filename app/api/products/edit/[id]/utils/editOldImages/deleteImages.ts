import dbWorker from "#db/dbWorker.ts";
import { ResultSetHeader } from "mysql2";

export default async function deleteImages(
  idProduct: number,
  ids: number[]
): Promise<ResultSetHeader> {
  const idsArray = ids.length ? ids : [0];
  const sql = `
    delete from ${process.env.TABLE_PREFIX}_products_images
    where
      idProduct = ?
      and id not in (
        ${idsArray.map(() => "?")}
      )
  `;
  const res = await dbWorker(sql, [idProduct, ...idsArray]);
  return res;
}
