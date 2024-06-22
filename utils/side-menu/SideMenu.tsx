import dbConnection from "@/db/connect";
import { CategoryType } from "@/types/categories/categoryType";
import Link from "next/link";

export default async function SideMenu() {
    const categories = await getAllCategories();
    return <>
        <div className="mb-2">
            <Link className="btn btn-dark d-block text-start mb-1" href={`/`}>Главная</Link>
        </div>
        <h4>Категории</h4>
        {categories.map((x) => <div key={x.id} >
            <Link className="btn btn-dark d-block text-start mb-1" href={`/category/${x.id}`}>{x.name}</Link>
        </div>)}
    </>
}

async function getAllCategories(): Promise<CategoryType[]> {
    const connection = await dbConnection();
    const categories = await connection.query(`select id, name from ${process.env.TABLE_PREFIX}_categories`).then(([x]: any) => x);
    await connection.end();
    return categories;
}
