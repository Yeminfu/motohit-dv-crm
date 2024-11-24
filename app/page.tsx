import { ts_categoriesWithIerarchy } from "@/types/categories/ts_categoriesWithIerarchy";
import AuthedLayout from "@/utils/authedLayout";
import getCategoriesWithIerarchy from "@/utils/side-menu/getCategoriesWithIerarchy";
import Link from "next/link";
import GlobalSearch from "./global-search/globalSearch";
import ts_categoryFilter from "#types/ts_categoryFilter.js";

export default async function Home(params: {
  searchParams: ts_categoryFilter;
}) {
  const categoriesWithIerarchy = await getCategoriesWithIerarchy();

  return (
    <main>
      <AuthedLayout title="Главная">
        <>
          <GlobalSearch searchParams={params.searchParams} />
          <div style={{ marginLeft: "-10px" }}>
            {categoriesWithIerarchy.map((category) => (
              <CategoryItem category={category} key={category.id} />
            ))}
          </div>
        </>
      </AuthedLayout>
    </main>
  );
}

function CategoryItem(props: { category: ts_categoriesWithIerarchy }) {
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
