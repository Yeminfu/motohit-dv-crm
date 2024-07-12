import AuthedLayout from "@/utils/authedLayout";
import { getCategoryById } from "../../../utils/getCategoryById";
import getProductsByCategoryId from "../../../utils/getProductsByCategoryId";
import CreateProduct from "@/utils/products/createProduct/createProduct";
import { ProductsFull } from "@/types/products/prodyctType";
import getShops from "../../../utils/getShops";
import getPriceTypes from "../../../utils/getPriceTypes";
import getProductImages from "../../../utils/getProductImages";
import getProductRetailPrices from "../../../utils/getProductRetailPrices";
import ViewProducts from "./viewProducts/ViewProducts";
import getProductStock from "../../../utils/getProductStock";

export default async function Page(a: { params: { id: string } }) {
    const idCategory = a.params.id;
    const category = await getCategoryById(idCategory);
    if (!category) return null;
    const products = await getProductsByCategoryId(idCategory);
    const shops = await getShops();
    const productsFull: ProductsFull[] = await Promise.all(products.map(
        async product => {
            const images = await getProductImages(product.id);
            const retailPrices = await getProductRetailPrices(product.id);
            const stock = await getProductStock(product.id);
            return {
                ...product,
                images,
                retailPrices,
                stock
            }
        }
    ));

    const priceTypes = await getPriceTypes();
    return <>
        <AuthedLayout title={category.name}>
            <>
                <CreateProduct idCategory={Number(a.params.id)} priceTypes={priceTypes} shops={shops} />
                <ViewProducts productsFull={productsFull} shops={shops} priceTypes={priceTypes}/>
            </>
        </AuthedLayout>
    </>
}
