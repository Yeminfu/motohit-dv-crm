import AuthedLayout from "@/utils/authedLayout";
import { getCategoryById } from "@/utils/getCategoryById";
import getPriceTypes from "@/utils/getPriceTypes";
import getShops from "@/utils/getShops";
import getProductsFull from "@/utils/getProductsFull";
import ts_categoryFilter from "@/types/ts_categoryFilter";
import ProductsList from "./views/ProductsList";
import Link from "next/link";
import getCategoryChildren from "./getCategoryChildren";

export default async function Page(params: { params: { id: string }, searchParams: ts_categoryFilter },) {

    const idCategory = params.params.id;
    const category = await getCategoryById(idCategory);

    if (!category) return null;

    const shops = await getShops();
    const productsFull = await getProductsFull(Number(idCategory), params.searchParams);
    const priceTypes = await getPriceTypes();

    const children = await getCategoryChildren(category.id);

    return <>
        <AuthedLayout title={category.category_name}>
            {(() => {
                if (children.length) {
                    return <>
                        {children.map(child => <div className="mb-2">
                            <Link className="btn btn-dark d-block text-start mb-1" href={
                                `/category/${child.id}`
                            }>{child.category_name}</Link>
                        </div>)}
                    </>
                }
                return <ProductsList idCategory={Number(idCategory)} priceTypes={priceTypes} shops={shops} productsFull={productsFull}
                    searchParams={params.searchParams}
                />;
            })()}

        </AuthedLayout>
    </>
}
