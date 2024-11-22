import ts_categoryFilter from "#types/ts_categoryFilter.ts";
import Filter from "./filter";
import getProductsFull from "./utils/getProductsFull";

export default async function GlobalSearch(props: {
  searchParams: ts_categoryFilter;
}) {
  const productsFull = await getProductsFull(props.searchParams);
  return (
    <>
      <Filter searchParams={props.searchParams} />
      <pre>{JSON.stringify({ productsFull }, null, 2)}</pre>
    </>
  );
}
