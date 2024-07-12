import dbConnection from "@/db/connect";
import { CategoryType } from "@/types/categories/categoryType";

export async function getCategoryById(
  idCategory: string
): Promise<CategoryType> {
  const connection = await dbConnection();
  const isValid = await connection
    .query(
      `select * from ${process.env.TABLE_PREFIX}_categories where id = ?`,
      [idCategory]
    )
    .then(([x]: any) => {
      if (x.length) return x.pop();
      return null;
    });

  await connection.end();
  return isValid;
}
