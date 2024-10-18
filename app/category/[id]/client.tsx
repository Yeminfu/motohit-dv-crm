"use client"

import CreateProduct from "@/utils/products/createProduct/createProduct";
import ViewProducts from "./viewProducts/ViewProducts";
import { PriceTypesFromDBInterface } from "@/types/products/priceTypesFromDBInterface";
import { ShopFromDB } from "@/types/shops/shopFromDBType";
import { ProductsFull } from "@/types/products/prodyctType";
import { useEffect, useState } from "react";
import getProducts from "./utils/getProducts";
import ts_categoryFilter from "@/types/ts_categoryFilter";
import tsAttributeWithValues from "@/types/attributes/ts_attributesWithValues";

export default function Client(props: {
    idCategory: number,
    priceTypes: PriceTypesFromDBInterface[],
    shops: ShopFromDB[],
    productsFull: ProductsFull[],
    searchParams: ts_categoryFilter
    attributesWithValues: tsAttributeWithValues[]
}) {

    const [stateProducts, setProducts] = useState<ProductsFull[]>(props.productsFull);

    useEffect(() => {
        let work = true;

        (async function refresh() {
            if (!work) return;
            const newProducts = await getProducts(props.idCategory, props.searchParams);
            if (newProducts.products) {
                if (JSON.stringify(newProducts.products) !== JSON.stringify(stateProducts)) {
                    setProducts(newProducts.products)
                }
            }
            await new Promise(r => {
                setTimeout(() => {
                    r(1)
                }, 2000);
            })
            await refresh();
        })()
        return () => {
            work = false;
        }
    }, [])

    if (!props.productsFull) return <>Загрузка...</>

    return <>
        <CreateProduct idCategory={props.idCategory} priceTypes={props.priceTypes} shops={props.shops} attributesWithValues={props.attributesWithValues} />
        <ViewProducts productsFull={stateProducts} shops={props.shops} priceTypes={props.priceTypes} searchParams={props.searchParams} />
    </>
}
