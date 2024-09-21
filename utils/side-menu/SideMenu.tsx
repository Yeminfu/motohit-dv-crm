import Link from "next/link";
import CreateCategory from "../createCategory/createCategory";
import getAllCategories from "../getAllCategories";
import { cookies } from "next/headers";
import getUserByToken from "../users/getUserByToken";
import { ts_categoriesWithIerarchy } from "@/types/categories/ts_categoriesWithIerarchy";
// import dbConnection from "@/db/connect";
// import getDataFromDB from "@/db/getDataFromDB";
import getCategoriesWithIerarchy from "./getCategoriesWithIerarchy";

export default async function SideMenu() {
  const authToken = String(cookies().get("auth")?.value);
  const user = await getUserByToken(authToken);
  const categories = await getAllCategories();
  const categoriesWithIerarchy: ts_categoriesWithIerarchy = {
    id: 1,
    slug: String(),
    category_name: "o_" + Date.now(),
    description: "hala baalla",
    chldren: [
      {
        id: 1,
        slug: String(),
        category_name: "o_" + Date.now(),
        description: "hala baalla",
      }
    ]
  };
  console.log({ categoriesWithIerarchy });

  return <>
    <div className="mb-2">
      <Link className="btn btn-dark d-block text-start mb-1" href={`/`}>Главная</Link>
    </div>
    <h4>Категории</h4>
    {categories.map((x) => <div key={x.id} >
      <Link className="btn btn-dark d-block text-start mb-1" href={`/category/${x.id}`}>{x.category_name}</Link>
    </div>)}
    <CreateCategory categories={categories} />
    <div className="mt-4">
      <Link className="btn btn-dark d-block text-start mb-1" href={`/users`}>Пользователи</Link>
    </div>
    {
      (user?.is_boss)
        ? <div className="mt-4">
          <Link className="btn btn-dark d-block text-start mb-1" href={`/sum-in-product`}>Сумма в товаре</Link>
        </div>
        : null
    }
    <div className="mt-4">
      <Link className="btn btn-dark d-block text-start mb-1" href={`/archive`}>Архив</Link>
    </div>
    {
      (user?.is_boss)
        ? <div className="mt-4">
          <Link className="btn btn-dark d-block text-start mb-1" href={`/sales-report`}>Годовой отчет</Link>
        </div>
        : null
    }
    {
      (user?.is_boss)
        ? <div className="mt-4">
          <Link className="btn btn-dark d-block text-start mb-1" href={`/products-create`}>Создать товар</Link>
        </div>
        : null
    }
  </>
}


getCategoriesWithIerarchy()