import ts_categoryFilter from "#types/ts_categoryFilter.js";
import Filter from "./filter";

export default function GlobalSearch(props: {
  searchParams: ts_categoryFilter;
}) {
  return (
    <>
      <Filter searchParams={props.searchParams} />
    </>
  );
}
