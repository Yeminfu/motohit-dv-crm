import getAllCategoriesWithProducts from "@/tools/db/getAllCategoriesWithProducts";
import CreateProductForm from "./form/form";
import { CategoryFromDBInterface } from "@/types/categories/categories";
import AuthedLayout from "@/utils/authedLayout";

export const dynamic = "force-dynamic";

export default async function Page() {
  const categories: CategoryFromDBInterface[] =
    await getAllCategoriesWithProducts(); //FIXME дубль
  return (
    <>
      <AuthedLayout title={"Создать товар"}>
        <CreateProductForm categories={categories} />
      </AuthedLayout>
    </>
  );
}
