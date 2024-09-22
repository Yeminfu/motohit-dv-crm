import getDataFromDB from "@/db/getDataFromDB";
import { CategoryFromDBInterface } from "@/types/categories/categories";

export default async function getCategoryChildren(idCategory: number): Promise<CategoryFromDBInterface[]> {
    const qs = `
        select * from ${process.env.TABLE_PREFIX}_categories where idParent = ?
    `;
    const children = await getDataFromDB(
        qs,
        [
            idCategory
        ]
    );
    return children;
}