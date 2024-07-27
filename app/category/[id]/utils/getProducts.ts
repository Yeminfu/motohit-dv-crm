export default async function getProducts(idCategory: number) {
    try {
        const response = await fetch(`/api/categories/get-category-products/${idCategory}`, { method: "post" });
        const data = await response.json();
        return data;
        console.log(data);
    } catch (error) {
        console.log('Error fetching data:', error);
    }
}