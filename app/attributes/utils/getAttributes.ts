import dbWorker from "@/db/dbWorker";
import { AttributeType } from "@/types/categories/attributes";

export default async function getAttributes(idCategory: number): Promise<AttributeType[]> {
  return await dbWorker(`
      select
        *
      from ${process.env.TABLE_PREFIX}_attributes
      where
        idCategory = ?
    `, [idCategory])
}