"use client"
import { useState } from "react";
import Modal from "../../modal/modal";
import CreateProductForm from "./CreateProductForm";
import { ShopFromDB } from "@/types/shops/shopFromDBType";
import { PriceTypesFromDBInterface } from "@/types/products/priceTypesFromDBInterface";

export default function CreateProduct(props: {
    idCategory: number,
    priceTypes: PriceTypesFromDBInterface[],
    shops: ShopFromDB[]
}) {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <button className="btn btn-outline-dark btn-sm" onClick={() => setIsOpen(!isOpen)}>
            Создать товар
        </button>
        <Modal
            isOpen={isOpen}
            title="Создать товар"
            closeFn={() => {
                setIsOpen(false);
            }}
        >
            <CreateProductForm idCategory={props.idCategory} priceTypes={props.priceTypes} shops={props.shops} closeFn={() => {
                setIsOpen(false);
            }} />
        </Modal>
    </>
}
