import dbWorker from "#db/dbWorker.ts";
import { ResultSetHeader } from "mysql2";

export default async function insertImageToDB(
  connection: any,
  filename: string,
  idProduct: number
): Promise<ResultSetHeader> {
  const sql = `call createProductImage(?,?)`;
  const res = await connection.query(sql, [filename, idProduct]);
  return res;
}
