import ts_productsQueryParams from "@/types/ts_productsQueryParams";
import dbWorker from "@/db/dbWorker2";

export default async function searchProducts(productsQueryParams: ts_productsQueryParams) {

  let sql = `select ${productsQueryParams.columns.join(', ')} from ${productsQueryParams.table}`;

  if (productsQueryParams.where) {
    sql += `\n where ${productsQueryParams.where}`;
  }

  if (productsQueryParams.orderBy) {
    sql += `\n ORDER BY ${productsQueryParams.orderBy}`;
  }

  if (productsQueryParams.limit !== undefined) {
    sql += `\n LIMIT ${productsQueryParams.limit}`;
  }

  if (productsQueryParams.offset !== undefined) {
    sql += `\n OFFSET ${productsQueryParams.offset}`;
  }

  const res = await dbWorker(sql, productsQueryParams.params)

  return res;
}