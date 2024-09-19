import getAllCategoriesWithProducts from "@/tools/db/getAllCategoriesWithProducts";
import { CategoryFromDBInterface } from "@/types/categories/categories";
import AuthedLayout from "@/utils/authedLayout";
import CreateCategoryForm from "./createCategoryForm";

export const dynamic = 'force-dynamic';

export default async function Page() {
    const categories: CategoryFromDBInterface[] = await getAllCategoriesWithProducts(); //FIXME дубль
    return (
        <>
            <AuthedLayout title={"Создать категорию"}>
                <CreateCategoryForm all_categories={categories} />
            </AuthedLayout>
        </>
    )
}