import Modal from "@/utils/modal/modal";
import { useState } from "react";

export default function SendProductToArchive(props: { idProduct: number, productName: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Modal title={`Подтвердите удаление товара: ${props.productName}`} isOpen={isOpen} closeFn={() => {
            setIsOpen(false);
        }}>
            <>
                <button className="btn btn-sm btn-danger">Подтвердить</button>
                <button className="btn btn-sm btn-dark ms-2" onClick={() => {
                    setIsOpen(false)
                }}>Отмена</button>
            </>
        </Modal>

        <button className="btn btn-sm btn-danger" onClick={() => {
            console.log(props.idProduct)
            setIsOpen(true);
        }}>В архив</button>

    </>
}