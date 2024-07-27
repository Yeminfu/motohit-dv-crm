import getAllCategories from "@/utils/getAllCategories";
import getProductsFull from "@/utils/getProductsFull";
import createPriceWithMarkup from "@/utils/prices/createPriceWithMarkup";
import getProductTotalInStock from "./getProductTotalInStock";

export default async function getSumInProduct() {
    const categories = await getAllCategories();

    const sumInCategories = await Promise.all(
        categories.map(async category => {
            const products = await getProductsFull(category.id, {});

            const sumInProducts = await Promise.all(products.map(async product => {
                const stockSum = await getProductTotalInStock(product.id);
                const costPrice = createPriceWithMarkup(product.purchase_price, product.idCostPriceType, product.costPriceValue)
                const sumInProduct = stockSum * costPrice;
                return sumInProduct;
            }))
                .then((x) => x.reduce((a, b) => (a + b)));

            return {
                categoryName: category.name,
                sumInProducts
            }
        })
    )

    return sumInCategories;
}
