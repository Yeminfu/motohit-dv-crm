import dbWorker from "@/db/dbWorker";
import { ProductFromDB } from "@/types/products/prodyctType";
import ts_categoryFilter from "@/types/ts_categoryFilter";

export default async function getProductsByCategoryId(
  idCategory: string | number,
  searchParams: ts_categoryFilter
): Promise<ProductFromDB[]> {

  const sqlParams: [string, any] = searchParams.name ? [
    `
      select * from ${process.env.TABLE_PREFIX}_products 
      where 
        idCategory = ?
        and isArchived = 0
        and
          (
            name like ?
            or code = ?
          )
      order by indexNumber desc
      limit 1
    `,
    [idCategory, `%${searchParams.name}%`, searchParams.name]
  ] : [
    `select * from ${process.env.TABLE_PREFIX}_products where idCategory = ? and isArchived = 0 order by indexNumber desc`,
    [idCategory]
  ];

  const products = await dbWorker(
    sqlParams[0], sqlParams[1]
  )
  return products;
}
