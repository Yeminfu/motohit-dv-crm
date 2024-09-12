import AuthedLayout from "@/utils/authedLayout";
import { getCategoryById } from "@/utils/getCategoryById";
import getPriceTypes from "@/utils/getPriceTypes";
import getShops from "@/utils/getShops";
import getProductsFull from "@/utils/getProductsFull";
import Client from "./client";
import ts_categoryFilter from "@/types/ts_categoryFilter";

export default async function Page(params: { params: { id: string }, searchParams: ts_categoryFilter },) {

    const idCategory = params.params.id;
    const category = await getCategoryById(idCategory);
    if (!category) return null;

    const shops = await getShops();
    const productsFull = await getProductsFull(Number(idCategory), params.searchParams);
    const priceTypes = await getPriceTypes();

    return <>
        <AuthedLayout title={category.category_name}>
            <Client idCategory={Number(idCategory)} priceTypes={priceTypes} shops={shops} productsFull={productsFull}
                searchParams={params.searchParams}
            />
        </AuthedLayout>
    </>
}
