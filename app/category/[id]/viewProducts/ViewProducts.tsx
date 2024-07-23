"use client"
import { ProductsFull } from "@/types/products/prodyctType";
import { ShopFromDB } from "@/types/shops/shopFromDBType";
import Price from "@/ui/price";
// import Image from "next/image";
import { useState } from "react";
import getCostPriceNumFromObj from "./getCostPriceNumFromObj";
import getRetailPriceNumFromObj from "./getRetailPriceNumFromObj";
import EditProduct from "../editProduct/EditProduct";
import { PriceTypesFromDBInterface } from "@/types/products/priceTypesFromDBInterface";
import SaleForm from "./SaleForm";
import generatePriceByTypes from "@/utils/prices/generatePriceByTypes";

export default function ViewProducts(props: {
    productsFull: ProductsFull[],
    shops: ShopFromDB[],
    priceTypes: PriceTypesFromDBInterface[],
}) {
    const [viewAll, setViewAll] = useState(false);
    return <>
        <div className="my-2"><button className="btn btn-outline-dark btn-sm" onClick={() => setViewAll(!viewAll)}>{viewAll ? "Скрыть" : "Показать"} дополнительные поля</button></div>
        <table className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    {/* <th>Фото</th> */}
                    <th>Наименование</th>
                    <th>Код</th>
                    {props.shops.map(shop => <th key={shop.id + 'a'} className="text-nowrap">Р.Ц. {shop.shopName}</th>)}
                    {props.shops.map(shop => <th key={shop.id + 'b'} className="text-nowrap" > К - во {shop.shopName}</th>)}
                    {viewAll && <>
                        <th className="text-nowrap">Закуп. цена</th>
                        <th className="text-nowrap">Себестоимость</th>
                    </>}
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.productsFull.map(product => <tr key={product.id}>
                    <td>{product.id}</td>
                    {/* <td>
                        {product.images.map(image => <Image
                            key={image.id}
                            loader={() => image.name}
                            src={image.name}
                            alt=""
                            width={0}
                            height={0}
                            style={{ width: "auto", height: "auto", marginBottom: 5, cursor: "pointer", }} />)}
                    </td> */}
                    <td><span style={{ color: product.color }}>{product.name}</span></td>
                    <td>{product.code}</td>
                    <>
                        {product.retailPrices.map(retailPriceObj => {
                            const costPrice = generatePriceByTypes(product.purchase_price, retailPriceObj.idPriceType, retailPriceObj.priceValue);
                            console.log('costPrice', costPrice);
                            const retailPriceValue = getRetailPriceNumFromObj(
                                product.purchase_price,
                                retailPriceObj, {
                                type: product.idCostPriceType,
                                value: product.costPriceValue
                            });
                            return <td key={retailPriceObj.id}>
                                <pre>{JSON.stringify(retailPriceObj, null, 2)}</pre>
                                <Price value={retailPriceValue} />
                            </td>
                        })}
                    </>
                    <>
                        {product.stock.map(stockObj => {
                            return <td key={stockObj.id}>
                                {stockObj.count}
                            </td>
                        })}
                    </>
                    {viewAll && <>
                        <td>
                            <Price value={product.purchase_price} />
                        </td>
                        <td>{(() => {
                            const value = getCostPriceNumFromObj(product.purchase_price, {
                                type: product.idCostPriceType,
                                value: product.costPriceValue
                            });
                            return <Price value={value} />
                        })()}</td>
                    </>}
                    <td style={{ whiteSpace: "nowrap" }}>
                        <div className="d-flex">
                            <SaleForm productFull={product} shops={props.shops}

                                retailPrices={product.retailPrices.map(retailPriceObj => {
                                    const retailPriceValue = getRetailPriceNumFromObj(
                                        product.purchase_price,
                                        retailPriceObj, {
                                        type: product.idCostPriceType,
                                        value: product.costPriceValue
                                    });

                                    return {
                                        idShop: retailPriceObj.idShop,
                                        sum: retailPriceValue
                                    }

                                    // return <td key={retailPriceObj.id}>
                                    //     <Price value={retailPriceValue} />
                                    // </td>
                                })}
                            />
                            <EditProduct product={product} priceTypes={props.priceTypes}
                                shops={props.shops}
                            />
                            <button className="btn btn-sm btn-danger" onClick={() => { console.log(product.id) }}>В архив</button>
                        </div>
                    </td>
                </tr>)}
            </tbody>
        </table >
    </>
}
