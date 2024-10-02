import dbWorker from "@/db/dbWorker"
import { CategoryFromDBInterface } from "@/types/categories/categories"

export default async function getCategory(idCategory: number): Promise<CategoryFromDBInterface | undefined> {
    return dbWorker(`
    select
      *
    from ${process.env.TABLE_PREFIX}_categories
    where
      id = ?
  `, [idCategory]).then(x => x.pop())
}