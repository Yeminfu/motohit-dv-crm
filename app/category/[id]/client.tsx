"use client"

import CreateProduct from "@/utils/products/createProduct/createProduct";
import ViewProducts from "./viewProducts/ViewProducts";
import { PriceTypesFromDBInterface } from "@/types/products/priceTypesFromDBInterface";
import { ShopFromDB } from "@/types/shops/shopFromDBType";
import { ProductsFull } from "@/types/products/prodyctType";
import { useState } from "react";

export default function Client(props: {
    idCategory: number,
    priceTypes: PriceTypesFromDBInterface[],
    shops: ShopFromDB[],
    productsFull: ProductsFull[]
}) {

    const [products, setProducts] = useState<ProductsFull[]>(props.productsFull);


    return <>
        <CreateProduct idCategory={props.idCategory} priceTypes={props.priceTypes} shops={props.shops} />
        <ViewProducts productsFull={products} shops={props.shops} priceTypes={props.priceTypes} />
    </>
}