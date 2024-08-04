"use client"
import Modal from "@/utils/modal/modal";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ReturnProductFromArchive(props: { idProduct: number, productName: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Modal title={`Подтвердите возврат товара из архива: ${props.productName}`} isOpen={isOpen} closeFn={() => {
            setIsOpen(false);
        }}>
            <>
                <button className="btn btn-sm btn-danger" onClick={() => onConfirm(props.idProduct, () => {
                    setIsOpen(false)
                })}>Подтвердить</button>
                <button className="btn btn-sm btn-dark ms-2" onClick={() => {
                    setIsOpen(false)
                }}>Отмена</button>
            </>
        </Modal>

        <button className="btn btn-sm btn-danger" onClick={() => {
            console.log(props.idProduct)
            setIsOpen(true);
        }}>Вернуть из архива</button>
    </>
}

async function onConfirm(idProduct: number, closeFn: any) {
    fetch(
        `/api/products/return-from-archive/${idProduct}`, { method: "post" }
    )
        .then(x => x.json())
        .then(x => {
            console.log('xxxxxxx', x);
            if (x.success) {
                closeFn();
                toast.success('Товар возвращен из архива')
            } else {
                toast.error('Ошибка #fj3b9')
            }
        })
}