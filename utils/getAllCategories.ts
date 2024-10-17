import dbWorker from "@/db/dbWorker";
import { ts_categoryType } from "@/types/categories/categoryType";

export default async function getAllCategories(): Promise<ts_categoryType[]> {
  const categories: ts_categoryType[] = await dbWorker(`
        select
            id,
            category_name 
        from ${process.env.TABLE_PREFIX}_categories`, [])
    .then((x: any) => x);
  return categories;
}
