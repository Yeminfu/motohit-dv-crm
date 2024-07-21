"use client"
import { ProductsFull } from "@/types/products/prodyctType";
import Modal from "@/utils/modal/modal";
import { useEffect, useState } from "react";
import { PriceTypesFromDBInterface } from "@/types/products/priceTypesFromDBInterface";
import EditProductForm from "./EditProductForm";
import { ShopFromDB } from "@/types/shops/shopFromDBType";

export default function EditProduct(props: {
    idProduct: number,
    priceTypes: PriceTypesFromDBInterface[],
    shops: ShopFromDB[]
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [product, setProduct] = useState<ProductsFull | null>(null);

    useEffect(() => {
        if (isOpen) {
            fetch(`/api/products/get/${props.idProduct}`, { method: "post" })
                .then(x => x.json())
                .then((x: any) => {
                    setProduct(x.product)
                })
        } else {
            setProduct(null);
        }
    }, [isOpen])

    return <>
        <button className="btn btn-sm btn-primary me-2" onClick={() => {
            setIsOpen(!isOpen)
        }
        }>Изменить</button>
        <pre>{JSON.stringify({ props, product }, null, 2)}</pre>
        {isOpen && <Modal
            isOpen={isOpen}
            title="Редактировать товар"
            closeFn={() => {
                setIsOpen(false);
            }}
        >
            <>
                {(() => {
                    if (product === null) return <>Загрузка...</>
                    return <>
                        <EditProductForm closeFn={() => {
                            setIsOpen(false);
                        }} product={product} priceTypes={props.priceTypes} shops={props.shops} />
                    </>
                })()}
            </>
        </Modal>}
    </>
}
