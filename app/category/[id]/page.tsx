import AuthedLayout from "@/utils/authedLayout";
import { getCategoryById } from "@/utils/getCategoryById";
import CreateProduct from "@/utils/products/createProduct/createProduct";
import ViewProducts from "./viewProducts/ViewProducts";
import getPriceTypes from "@/utils/getPriceTypes";
import getShops from "@/utils/getShops";
import getProductsFull from "@/utils/getProductsFull";

export default async function Page(params: { params: { id: string } }) {
    const idCategory = params.params.id;
    const category = await getCategoryById(idCategory);
    if (!category) return null;

    const shops = await getShops();
    const productsFull = await getProductsFull(Number(idCategory));
    const priceTypes = await getPriceTypes();

    return <>
        <AuthedLayout title={category.name}>
            <>
                <CreateProduct idCategory={Number(params.params.id)} priceTypes={priceTypes} shops={shops} />
                <ViewProducts productsFull={productsFull} shops={shops} priceTypes={priceTypes} />
            </>
        </AuthedLayout>
    </>
}
