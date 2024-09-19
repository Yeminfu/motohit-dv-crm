import getAllCategoriesWithProducts from "@/tools/db/getAllCategoriesWithProducts";
import CreateProductForm from "./form"
import { CategoryFromDBInterface } from "@/types/categories/categories";
// import getAllCategoriesWithProducts from "@/src/components/db/getAllCategoriesWithProducts";
// import { CategoryFromDBInterface } from "@/src/app/types/categories";

// FIXME пути в квадратных кскобках не катят тут и в категориях. надо решить вопрос с кешем этих страниц, не получается убрать кеш на получении категорий
export const dynamic = 'force-dynamic';

export default async function Page() {
    const categories: CategoryFromDBInterface[] = await getAllCategoriesWithProducts(); //FIXME дубль
    return (
        <>
            <h1>Создать товар</h1>
            <CreateProductForm categories={categories} />
        </>
    )
}
