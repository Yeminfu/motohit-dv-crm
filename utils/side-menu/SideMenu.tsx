import Link from "next/link";
import CreateCategory from "../createCategory/createCategory";
import getAllCategories from "../getAllCategories";
import { cookies } from "next/headers";
import getUserByToken from "../users/getUserByToken";
import getCategoriesWithIerarchy from "./getCategoriesWithIerarchy";
import Card from "./Card";

export default async function SideMenu() {
  const authToken = String(cookies().get("auth")?.value);
  const user = await getUserByToken(authToken);
  const categories = await getAllCategories();

  const categoriesWithIerarchy = await getCategoriesWithIerarchy();
  return (
    <>
      {user?.id === 1 && (
        <Card title="Админ">
          <>
            <Link
              className="btn btn-dark d-block text-start mb-1"
              href={`/admin`}
            >
              Админ
            </Link>
            <Link
              className="btn btn-dark d-block text-start mb-1"
              href={`/admin/config`}
            >
              Конфигурация
            </Link>
          </>
        </Card>
      )}

      <Card title="">
        <div>
          <Link className="btn btn-dark d-block text-start mb-1" href={`/`}>
            Главная
          </Link>
        </div>
      </Card>
      <Card title="Категории">
        <>
          {categoriesWithIerarchy.map((category) => (
            <Link
              key={category.id}
              className="btn btn-dark d-block text-start mb-1"
              href={`/category/${category.id}`}
            >
              {category.category_name}
            </Link>
          ))}
          <CreateCategory categories={categories} />
        </>
      </Card>

      <ul className="list-group list-group-flush">
        {/* <li className="list-group-item"></li> */}

        <li className="list-group-item"></li>

        <li className="list-group-item">
          <Link
            className="btn btn-dark d-block text-start"
            href={`/attributes/categories`}
          >
            Атрибуты
          </Link>
        </li>
      </ul>

      <Card title="Пользователи">
        <>
          <Link
            className="btn btn-dark d-block text-start mb-1"
            href={`/users`}
          >
            Пользователи
          </Link>
        </>
      </Card>

      <div className="mt-4"></div>
      {(() => {
        if (!user?.is_boss) return null;
        return (
          <Card title="Отчеты">
            <>
              <Link
                className="btn btn-dark d-block text-start mb-1"
                href={`/sales-report`}
              >
                Годовой отчет
              </Link>
              {user?.is_boss ? (
                <>
                  <Link
                    className="btn btn-dark d-block text-start mb-1"
                    href={`/sum-in-product`}
                  >
                    Сумма в товаре
                  </Link>
                  <Link
                    className="btn btn-dark d-block text-start mb-1"
                    href={`/history?limit=100`}
                  >
                    История
                  </Link>
                </>
              ) : null}
            </>
          </Card>
        );
      })()}
      <Card title="">
        <Link
          className="btn btn-dark d-block text-start mb-1"
          href={`/archive`}
        >
          Архив
        </Link>
      </Card>
    </>
  );
}
