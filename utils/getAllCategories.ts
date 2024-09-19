import dbConnection from "@/db/connect";
import { ts_categoryType } from "@/types/categories/categoryType";

export default async function getAllCategories(): Promise<ts_categoryType[]> {
    const connection = await dbConnection();
    const categories: ts_categoryType[] = await connection.query(`select id, category_name from ${process.env.TABLE_PREFIX}_categories`).then(([x]: any) => x);
    await connection.end();
    return categories;
}
