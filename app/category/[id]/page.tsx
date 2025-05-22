import AuthedLayout from "@/utils/authedLayout";
import { getCategoryById } from "@/utils/getCategoryById";
import getPriceTypes from "@/utils/getPriceTypes";
import getShops from "@/utils/getShops";
import getProductsFull from "@/utils/getProductsFull";
import ts_categoryFilter from "@/types/ts_categoryFilter";
import ProductsList from "./views/ProductsList";
import Link from "next/link";
import getCategoryChildren from "./getCategoryChildren";
import getAttributes from "@/app/attributes/utils/getAttributes";
import getAttributevalues from "@/app/attributes/category/[id]/getAttributevalues";
import tsAttributeWithValues from "@/types/attributes/ts_attributesWithValues";
import getAllCategoriesWithProducts from "@/tools/db/getAllCategoriesWithProducts";

export default async function Page(params: {
  params: { id: string };
  searchParams: ts_categoryFilter;
}) {
  const idCategory = params.params.id;
  const category = await getCategoryById(idCategory);

  const categories = await getAllCategoriesWithProducts();

  if (!category) return null;

  const shops = await getShops();
  const productsFull = await getProductsFull(
    Number(idCategory),
    params.searchParams
  );
  const priceTypes = await getPriceTypes();

  const children = await getCategoryChildren(Number(category.id));

  const attributes = await getAttributes(Number(idCategory));

  const attributesWithValues: tsAttributeWithValues[] = [];

  for (let index = 0; index < attributes.length; index++) {
    const attribute = attributes[index];
    const values = await getAttributevalues(Number(attribute.id));
    attributesWithValues.push({
      ...attribute,
      values,
    });
  }

  return (
    <>
      <AuthedLayout title={category.category_name}>
        <>
          {/* <pre>{JSON.strinegify(attributesWithValues, null, 2)}</pre> */}
          {(() => {
            if (children.length) {
              return (
                <>
                  {children.map((child) => (
                    <div className="mb-2" key={child.id}>
                      <Link
                        className="btn btn-dark d-block text-start mb-1"
                        href={`/category/${child.id}`}
                      >
                        {child.category_name}
                      </Link>
                    </div>
                  ))}
                </>
              );
            }
            return (
              <ProductsList
                idCategory={Number(idCategory)}
                priceTypes={priceTypes}
                shops={shops}
                productsFull={productsFull}
                searchParams={params.searchParams}
                attributesWithValues={attributesWithValues}
                categories={categories}
              />
            );
          })()}
        </>
      </AuthedLayout>
    </>
  );
}
