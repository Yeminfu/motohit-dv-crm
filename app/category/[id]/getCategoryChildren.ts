import dbWorker from "@/db/dbWorker";
import { CategoryFromDBInterface } from "@/types/categories/categories";

export default async function getCategoryChildren(idCategory: number): Promise<CategoryFromDBInterface[]> {
    const qs = `
        select * from ${process.env.TABLE_PREFIX}_categories where idParent = ?
    `;
    const children = await dbWorker(
        qs,
        [
            idCategory
        ]
    );
    return children;
}