import dbWorker from "@/db/dbWorker";
import { ProductFromDB } from "@/types/products/prodyctType";
import ts_categoryFilter from "@/types/ts_categoryFilter";

export default async function getProductsByCategoryId(
  idCategory: string | number,
  searchParams: ts_categoryFilter
): Promise<ProductFromDB[]> {


  const sqlParams: [string, any] = searchParams.name ? [
    `select * from ${process.env.TABLE_PREFIX}_products 
    where 
      idCategory = ?
      and isArchived = 0
      and
        (
          name like ?
          or code = ?
        )
        
    `,
    [idCategory, `%${searchParams.name}%`, searchParams.name]
  ] : [
    `select * from ${process.env.TABLE_PREFIX}_products where idCategory = ? and isArchived = 0 `,
    [idCategory]
  ];

  const products = await dbWorker(
    sqlParams[0], sqlParams[1]
  )
    // .then(([x]: any) => {
    //   return x;
    // });

  // await connection.end();
  return products;
}
