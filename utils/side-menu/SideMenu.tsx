import Link from "next/link";
import CreateCategory from "../createCategory/createCategory";
import getAllCategories from "../getAllCategories";
import { cookies } from "next/headers";
import getUserByToken from "../users/getUserByToken";
import getCategoriesWithIerarchy from "./getCategoriesWithIerarchy";

export default async function SideMenu() {
  const authToken = String(cookies().get("auth")?.value);
  const user = await getUserByToken(authToken);
  const categories = await getAllCategories();

  const categoriesWithIerarchy = await getCategoriesWithIerarchy();
  return <>
    <ul className="list-group list-group-flush">
      <li className="list-group-item">
        <Link className="btn btn-dark d-block text-start mb-1" href={`/`}>Главная</Link>
      </li>
      <li className="list-group-item">
        <h4>Категории</h4>
        <div style={{ marginLeft: "-10px" }}>
          {categoriesWithIerarchy.map(category => <Link className="btn btn-dark d-block text-start mb-1" href={`/category/${category.id}`}>{category.category_name}</Link>
          )}
        </div>
      </li>
      <li className="list-group-item"><div>
        <CreateCategory categories={categories} />
      </div></li>
      {
        (user?.is_boss)
          ? <li className="list-group-item">
            <Link className="btn btn-dark d-block text-start mb-1" href={`/products/create`}>Создать товар</Link>
          </li>
          : null
      }
      <li className="list-group-item">
        <h4>Пользователи</h4>
        <Link className="btn btn-dark d-block text-start" href={`/users`}>Пользователи</Link>
      </li>
      {
        (user?.is_boss)
          ? <li className="list-group-item">
            <Link className="btn btn-dark d-block text-start mb-1" href={`/sum-in-product`}>Сумма в товаре</Link>
          </li>
          : null
      }

    </ul>

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

  </>
}
