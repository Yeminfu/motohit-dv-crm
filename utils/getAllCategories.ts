import dbConnection from "@/db/connect";
import { CategoryType } from "@/types/categories/categoryType";

export default async function getAllCategories(): Promise<CategoryType[]> {
    const connection = await dbConnection();
    const categories: CategoryType[] = await connection.query(`select id, category_name from ${process.env.TABLE_PREFIX}_categories`).then(([x]: any) => x);
    await connection.end();
    return categories;
}
