import { ts_categoriesWithIerarchy } from "@/types/categories/ts_categoriesWithIerarchy";
import AuthedLayout from "@/utils/authedLayout";
import getCategoriesWithIerarchy from "@/utils/side-menu/getCategoriesWithIerarchy";
import Link from "next/link";
import GlobalSearch from "./global-search/globalSearch";
import ts_categoryFilter from "#types/ts_categoryFilter.ts";
import { getCategoryById } from "#utils/getCategoryById.ts";
import dbWorker from "#db/dbWorker2.ts";

export default async function Home(params: {
  searchParams: ts_categoryFilter;
}) {
  const categoriesWithIerarchy = await getCategoriesWithIerarchy();

  return (
    <main>
      <AuthedLayout title="Главная">
        <>
          <div className="card">
            <div className="card-header">
              <strong>Поиск по всем товарам</strong>
            </div>
            <div className="card-body">
              <GlobalSearch searchParams={params.searchParams} />
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

  const isInShop = await checkCategoryIsInShop(props.category.id);

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

async function checkCategoryIsInShop(idCategory: number) {
  const categoryFromCRM = await getCategoryById(String(idCategory));

  const sql = `
    select * from motohit_dv.categories where id = ?
  `;

  const categoryFromShop = await dbWorker(sql, [idCategory]).then((x) =>
    x.result?.pop()
  );

  return categoryFromShop;

  // console.log({ idCategory, categoryFromCRM, categoryFromShop });
}
