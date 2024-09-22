import AuthedLayout from "@/utils/authedLayout";
import { getCategoryById } from "@/utils/getCategoryById";
import getPriceTypes from "@/utils/getPriceTypes";
import getShops from "@/utils/getShops";
import getProductsFull from "@/utils/getProductsFull";
import ts_categoryFilter from "@/types/ts_categoryFilter";
import ProductsList from "./views/ProductsList";

export default async function Page(params: { params: { id: string }, searchParams: ts_categoryFilter },) {

    const idCategory = params.params.id;
    const category = await getCategoryById(idCategory);
    if (!category) return null;

    const shops = await getShops();
    const productsFull = await getProductsFull(Number(idCategory), params.searchParams);
    const priceTypes = await getPriceTypes();

    return <>
        <AuthedLayout title={category.category_name}>
            {(()=>{
                // ProductsList
                return <ProductsList idCategory={Number(idCategory)} priceTypes={priceTypes} shops={shops} productsFull={productsFull}
                searchParams={params.searchParams}
            />;
            })()}
            {/* <pre>{JSON.stringify(category, null, 2)}</pre> */}
            
        </AuthedLayout>
    </>
}
