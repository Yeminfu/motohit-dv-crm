import AuthedLayout from "@/utils/authedLayout";
import { getCategoryById } from "@/utils/getCategoryById";
import getPriceTypes from "@/utils/getPriceTypes";
import getShops from "@/utils/getShops";
import getProductsFull from "@/utils/getProductsFull";
import Client from "./client";

export default async function Page(params: { params: { id: string } }) {
    const idCategory = params.params.id;
    const category = await getCategoryById(idCategory);
    if (!category) return null;

    const shops = await getShops();
    const productsFull = await getProductsFull(Number(idCategory));
    const priceTypes = await getPriceTypes();

    return <>
        <AuthedLayout title={category.name}>
            <Client idCategory={Number(idCategory)} priceTypes={priceTypes} shops={shops} productsFull={productsFull} />
        </AuthedLayout>
        <pre>{JSON.stringify(['productsFull', productsFull], null, 2)}</pre>
    </>
}
