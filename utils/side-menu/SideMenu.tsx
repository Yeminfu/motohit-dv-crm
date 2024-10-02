import Link from "next/link";
import CreateCategory from "../createCategory/createCategory";
import getAllCategories from "../getAllCategories";
import { cookies } from "next/headers";
import getUserByToken from "../users/getUserByToken";
import { ts_categoriesWithIerarchy } from "@/types/categories/ts_categoriesWithIerarchy";
import getCategoriesWithIerarchy from "./getCategoriesWithIerarchy";

export default async function SideMenu() {
  const authToken = String(cookies().get("auth")?.value);
  const user = await getUserByToken(authToken);
  const categories = await getAllCategories();

  const categoriesWithIerarchy = await getCategoriesWithIerarchy();
  // if(1)return null
  return <>
    <ul className="list-group list-group-flush">
      <li className="list-group-item">
        <Link className="btn btn-dark d-block text-start mb-1" href={`/`}>Главная</Link>
      </li>
      <li className="list-group-item">
        <h4>Категории</h4>
        <div style={{ marginLeft: "-10px" }}>
          {categoriesWithIerarchy.map(category => <CategoryItem category={category} key={category.id} />)}
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



    {/* {categories.map((x) => <div key={x.id} >
      <Link className="btn btn-dark d-block text-start mb-1" href={`/category/${x.id}`}>{x.category_name}</Link>
    </div>)} */}

    {/* <div className="mt-4">
      <Link className="btn btn-dark d-block text-start mb-1" href={`/users`}>Пользователи</Link>
    </div> */}

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

function CategoryItem(props: { category: ts_categoriesWithIerarchy }) {
  const children = props.category.children ?
    props.category.children?.map(child => <CategoryItem category={child} />)
    : null;

  return <>
    <div style={{ marginLeft: "10px" }}>
      <Link className="btn btn-dark d-block text-start mb-1" href={`/category/${props.category.id}`}>{props.category.category_name}</Link>
      {children}
    </div>
  </>
}