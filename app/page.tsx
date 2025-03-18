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
                  <table className="table table-bordered">
                    <tbody>
                      {categoriesWithIerarchy.map((category) => (
                        <tr key={category.id}>
                          <td>
                            <CategoryItem category={category} />
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
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
    ? <table className="table">
      {props.category.children?.map((child) => (
        <tr key={child.id} >
          <td>
            <CategoryItem category={child} />
          </td>
        </tr>
      ))}
    </table>
    : null;

  const isInShop = await checkCategoryIsInShop(props.category.id);

  return (
    <>
      <table className="table table-bordered w-auto" >
        <thead>
          <tr>
            <th>Категория</th>
            <th>Потомки</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Link
                style={{ maxWidth: "250px" }}
                className="btn btn-outline-dark d-block text-start mb-1"
                href={`/category/${props.category.id}`}
              >
                {props.category.category_name}
              </Link>

            </td>
            <td>
              {children}
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ marginLeft: "10px" }}>
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
