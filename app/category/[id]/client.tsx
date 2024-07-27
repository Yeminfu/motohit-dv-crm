"use client"

import CreateProduct from "@/utils/products/createProduct/createProduct";
import ViewProducts from "./viewProducts/ViewProducts";
import { PriceTypesFromDBInterface } from "@/types/products/priceTypesFromDBInterface";
import { ShopFromDB } from "@/types/shops/shopFromDBType";
import { ProductsFull } from "@/types/products/prodyctType";
import { useEffect, useState } from "react";

export default function Client(props: {
    idCategory: number,
    priceTypes: PriceTypesFromDBInterface[],
    shops: ShopFromDB[],
    productsFull: ProductsFull[]
}) {

    const [stateProducts, setProducts] = useState<ProductsFull[]>(props.productsFull);

    useEffect(() => {
        let work = true;

        (async function refresh() {
            if (!work) return;
            const newProducts = await getProducts(props.idCategory);
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
        <CreateProduct idCategory={props.idCategory} priceTypes={props.priceTypes} shops={props.shops} />
        <ViewProducts productsFull={stateProducts} shops={props.shops} priceTypes={props.priceTypes} />
    </>
}

async function getProducts(idCategory: number) {
    try {
        const response = await fetch(`/api/categories/get-category-products/${idCategory}`, { method: "post" });
        const data = await response.json();
        return data;
        console.log(data);
    } catch (error) {
        console.log('Error fetching data:', error);
    }
}