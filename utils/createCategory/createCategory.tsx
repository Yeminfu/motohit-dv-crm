"use client"

import { useState } from "react"
import Modal from "../modal/modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ts_categoryType } from "@/types/categories/categoryType";

export default function CreateCategory(props: { categories: ts_categoryType[] }) {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <button className="btn btn-primary btn-sm w-100 text-start" onClick={() => setIsOpen(!isOpen)}>
            Создать категорию
        </button>
        <Modal
            isOpen={isOpen}
            title="Создать категорию"
            closeFn={() => {
                setIsOpen(false);
            }}
        >
            <>
                <Form
                    categories={props.categories}
                    closeFn={() => {
                        setIsOpen(false);
                    }} />
            </>
        </Modal>
    </>
}

function Form(props: { closeFn: any, categories: ts_categoryType[] }) {
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
            <div className="mb-2"><input {...register("category_name", { required: true })} placeholder="Название" className="form-control" autoComplete="off" /></div>
            <div className="mb-2"><textarea {...register("description", { required: true })} placeholder="Описание" className="form-control" autoComplete="off" /></div>
            <div className="mb-2">
                <select {...register("idParent")} className="form-select" autoComplete="off" >
                    <option value="">Родительская категория</option>
                    {props.categories.map(caterogy => <option key={caterogy.id} value={caterogy.id} >{caterogy.category_name}</option>)}
                </select>
            </div>
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