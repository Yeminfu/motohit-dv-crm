import Link from "next/link";
import CreateCategory from "../createCategory/createCategory";
import getAllCategories from "../getAllCategories";
import { cookies } from "next/headers";
import getUserByToken from "../users/getUserByToken";
import getCategoriesWithIerarchy from "./getCategoriesWithIerarchy";
import Card from "./Card";
import getUsersByGroupName from "@/utils/users/getUsersByGroupName";

export default async function SideMenu() {
  const authToken = String(cookies().get("auth")?.value);
  const user = await getUserByToken(authToken);

  if (!user) return <>Error #fsdf0</>

  const categories = await getAllCategories();

  const users = await getUsersByGroupName('su');

  const isAdmin = await getUsersByGroupName('admin').then(x => x.find(x => x.id === user.id));

  const isSU = users.find(x => x.id === user.id)

  // if (isSU) { return <>isSU: {JSON.stringify(isSU)}</> }

  // if (1) return <pre>{JSON.stringify({ users }, null, 2)}</pre>;

  const categoriesWithIerarchy = await getCategoriesWithIerarchy();

  return (
    <>
      {isAdmin && (
        <Card title="Админ">
          <>
            {isSU && <><Link
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
              </Link></>}
            <Link
              className="btn btn-dark d-block text-start mb-1"
              href={`/admin/groups`}
            >
              Группы
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
        if (!user) return null;
        return (
          <Card title="Отчеты">
            <>
              {user.is_boss && (
                <>
                  <Link
                    className="btn btn-dark d-block text-start mb-1"
                    href={`/sales-report`}
                  >
                    Годовой отчет
                  </Link>
                  <Link
                    className="btn btn-dark d-block text-start mb-1"
                    href={`/sales-per-day`}
                  >
                    Продажи за день
                  </Link>
                  <Link
                    className="btn btn-dark d-block text-start mb-1"
                    href={`/sum-in-product`}
                  >
                    Сумма в товаре
                  </Link>
                </>
              )}
              <Link
                className="btn btn-dark d-block text-start mb-1"
                href={`/history?limit=1000`}
              >
                История
              </Link>
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

