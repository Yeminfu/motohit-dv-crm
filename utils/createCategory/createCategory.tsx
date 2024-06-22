"use client"

import { useState } from "react"
import Modal from "../modal/modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateCategory() {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <h3>CreateCategory</h3>
        <button className="btn btn-outline-dark btn-sm" onClick={() => setIsOpen(!isOpen)}>
            Создать категорию
        </button>
        <Modal
            isOpen={isOpen}
            title="Создать категорию"
            closeFn={() => {
                setIsOpen(false);
            }}
        >
            <CreateCategoryForm closeFn={() => {
                setIsOpen(false);
            }} />
        </Modal>
    </>
}

function CreateCategoryForm(props: { closeFn: any }) {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<any>();

    return <>
        <form onSubmit={handleSubmit(async x => {
            const { success, error } = await onSubmit(x);
            if (success) {
                toast.success('Категория создана');
                reset();
            } else {
                toast.error(error)
            }
        })}>
            <div className="mb-2"><input {...register("name", { required: true })} placeholder="Название категории" className="form-control" autoComplete="off" /></div>
            <div className="d-flex">
                <button className="btn btn-sm btn-outline-dark">Сохранить</button>
                <div className="btn btn-sm btn-outline-danger ms-2" onClick={() => {
                    reset();
                    props.closeFn(false);
                }}>отмена</div>
            </div>
        </form>
    </>
}

async function onSubmit(values: any) {
    return await fetch("/api/categories/create", {
        method: "POST",
        body: JSON.stringify(values)
    })
        .then(x => x.json());

}