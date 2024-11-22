import ts_categoryFilter from "@/types/ts_categoryFilter";

export default async function getProducts(searchParams: ts_categoryFilter) {
  try {
    const response = await fetch(
      `/api/products/get-by-name?name=${searchParams.name}`,
      {
        method: "post",
        body: JSON.stringify({ searchParams }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}
