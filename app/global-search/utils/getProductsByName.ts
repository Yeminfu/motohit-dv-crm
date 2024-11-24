import dbWorker from "#db/dbWorker.ts";
import { ProductFromDB } from "#types/products/prodyctType.ts";
import ts_categoryFilter from "#types/ts_categoryFilter.ts";

export default async function getProductsByName(
  searchParams: ts_categoryFilter
): Promise<ProductFromDB[]> {
  const sql = `
    select
      *
    from ${process.env.TABLE_PREFIX}_products 
    where 
      isArchived = 0
      and
        (
          name like ?
          or code = ?
        )
  `;

  const products = await dbWorker(sql, [
    `%${searchParams.name}%`,
    searchParams.name,
  ]);
  return products;
}
