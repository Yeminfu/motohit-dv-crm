import getAllCategoriesWithProducts from "@/tools/db/getAllCategoriesWithProducts";
import ts_categoryFilter from "@/types/ts_categoryFilter";
import getPriceTypes from "@/utils/getPriceTypes";
import getShops from "@/utils/getShops";
import ProductsList from "./ProductsList";
import getProductsFull from "./utils/getProductsFull";

export default async function GlobalSearch(props: {
  searchParams: ts_categoryFilter;
  canEditStock: boolean
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
        canEditStock={props.canEditStock}
      />
    </>
  );
}
