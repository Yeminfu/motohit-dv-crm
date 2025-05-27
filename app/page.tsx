import { ts_categoriesWithIerarchy } from "@/types/categories/ts_categoriesWithIerarchy";
import AuthedLayout from "@/utils/authedLayout";
import getCategoriesWithIerarchy from "@/utils/side-menu/getCategoriesWithIerarchy";
import Link from "next/link";
import GlobalSearch from "./global-search/globalSearch";
import ts_categoryFilter from "@/types/ts_categoryFilter";
import { getCategoryById } from "@/utils/getCategoryById";
import dbWorker from "@/db/dbWorker2";
import getUserByToken from "@/utils/users/getUserByToken";
import { cookies } from "next/headers";
import checkUserIsInGroup from "@/utils/users/checkUserIsInGroup";

export default async function Home(params: {
  searchParams: ts_categoryFilter;
}) {

  const authToken = String(cookies().get("auth")?.value);
  const user = await getUserByToken(authToken);

  if (!user) return <>error #d943j-</>

  const categoriesWithIerarchy = await getCategoriesWithIerarchy();

  const canEditStock = await checkUserIsInGroup(user.id, 'canEditStock')


  return (
    <main>
      <AuthedLayout title="Главная">
        <>
          <div className="card">
            <div className="card-header">
              <strong>Поиск по всем товарам</strong>
            </div>
            <div className="card-body">
              <GlobalSearch searchParams={params.searchParams} canEditStock={canEditStock} />
            </div>
          </div>

          <div className="mt-2">
            <div className="card">
              <div className="card-header">
                <strong>Категории</strong>
              </div>
              <div className="card-body">
                <div style={{ marginLeft: "-10px" }}>
                  {categoriesWithIerarchy.map((category) => (
                    <CategoryItem category={category} key={category.id} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      </AuthedLayout>
    </main>
  );
}

async function CategoryItem(props: { category: ts_categoriesWithIerarchy }) {
  const children = props.category.children
    ? props.category.children?.map((child) => (
      <CategoryItem category={child} key={child.id} />
    ))
    : null;


  return (
    <>
      <div style={{ marginLeft: "10px" }}>
        <Link
          className="btn btn-outline-dark d-block text-start mb-1"
          href={`/category/${props.category.id}`}
        >
          {props.category.category_name}
        </Link>
        {children}
      </div>
    </>
  );
}
