import dbWorker from "#db/dbWorker.ts";
import { ResultSetHeader } from "mysql2";

export default async function deleteImages(
  connection: any,
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
  const res = await connection.query(sql, [idProduct, ...idsArray]);
  return res;
}
