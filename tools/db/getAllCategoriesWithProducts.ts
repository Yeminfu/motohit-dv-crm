import dbConnection from "@/db/connect";
import { CategoryFromDBInterface } from "@/types/categories/categories";

export default async function getAllCategoriesWithProducts(): Promise<CategoryFromDBInterface[]> {
  const qs = `
    select
        *
    from ${process.env.TABLE_PREFIX}_categories 
    where
      id not in (
        select distinct 
          idParent 
        from ${process.env.TABLE_PREFIX}_categories 
        where
          idParent is not null
      )
  `;

  const connection = await dbConnection();

  const categories = await connection.query(qs).then(([x]: any) => x);

  await connection.end();

  return categories;
}