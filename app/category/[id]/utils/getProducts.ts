import ts_categoryFilter from "@/types/ts_categoryFilter";

export default async function getProducts(idCategory: number, searchParams: ts_categoryFilter) {
    try {
        const response = await fetch(
            `/api/categories/get-category-products/${idCategory}`,
            {
                method: "post",
                body: JSON.stringify({ searchParams })
            }
        );
        const data = await response.json();
        return data;
        console.log(data);
    } catch (error) {
        console.log('Error fetching data:', error);
    }
}