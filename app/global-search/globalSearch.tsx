import getAllCategoriesWithProducts from "#tools/db/getAllCategoriesWithProducts.ts";
import ts_categoryFilter from "#types/ts_categoryFilter.ts";
import getPriceTypes from "#utils/getPriceTypes.ts";
import getShops from "#utils/getShops.ts";
import ProductsList from "./ProductsList";
import getProductsFull from "./utils/getProductsFull";

export default async function GlobalSearch(props: {
  searchParams: ts_categoryFilter;
}) {
  const productsFull = await getProductsFull(props.searchParams);
  const priceTypes = await getPriceTypes();
  const shops = await getShops();
  const categories = await getAllCategoriesWithProducts();

  return (
    <>
      <ProductsList
        priceTypes={priceTypes}
        shops={shops}
        productsFull={productsFull}
        searchParams={props.searchParams}
        categories={categories}
      />
    </>
  );
}
