"use client"

import { Fragment, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CategoryFromDBInterface } from "@/types/categories/categories";
import TextEditor from "@/tools/text-editor/TextEditor";
import convertToIframeLink from "@/tools/convertToIframeLink";

type Inputs = any;

export default function CreateCategoryForm(props: { all_categories: CategoryFromDBInterface[] }) {

    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, setValue, reset, getValues, control, resetField } = useForm<Inputs>();
    const { fields: videoFields, append: appendVideo, remove: removeVideo } = useFieldArray({ control, name: "category_video" });

    return <>
        <form onSubmit={handleSubmit(e => onSubmit(e, reset))} >
            <Wrapper title={<strong>Название</strong>}>
                <input {...register('category_name', {
                    required: true,
                })} className="form-control" autoComplete="off" />
            </Wrapper>
            <Wrapper title={<strong>Родительская категория</strong>}>
                <select className="form-control" {...register("parent")}>
                    <option value={""}>-</option>
                    {props.all_categories
                        .map((category) => <Fragment key={category.id} >
                            <option value={category.id}>{category.category_name}</option>
                        </Fragment>)}
                </select>
            </Wrapper>
            <Wrapper title={<strong>Описание</strong>}>
                <TextEditor description={""} updateDescription={(html: string) => {
                    setValue("description", html)
                }} />
            </Wrapper>
            <Wrapper title={<strong>Видео</strong>}>

                {videoFields.map((videoField: any, i) => <div key={videoField.id} className="p-2 mb-3 shadow">
                    <iframe className="mw-100" src={videoField.url} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen height="281" width="500"></iframe>
                    <div className="btn btn-sm btn-danger" onClick={() => removeVideo(i)}>удалить</div>
                </div>)}

                <div className="d-flex">
                    <input type="text" placeholder="Введите ссылку на Yutube" {...register("inserted_youtube_url")} />
                    <div className="btn btn-sm btn-outline-dark"
                        onClick={() => {
                            const insertedUrl = getValues("inserted_youtube_url");
                            if (!insertedUrl.length) return;
                            const youtubeLink = convertToIframeLink(insertedUrl);
                            appendVideo({ url: youtubeLink });
                            resetField("inserted_youtube_url");
                        }}
                    >добавить видео</div>
                </div>

            </Wrapper>
            <div className="mt-3">
                <button className="btn btn-sm btn-outline-dark me-3">сохранить</button>
            </div>
        </form>
    </>
}

function Wrapper({ children, title }: { children: any, title: any }) {
    return <>
        <div className='row mb-2'>
            <div className="col-lg-3"><strong>{title}</strong></div>
            <div className="col">
                {children}
            </div>
        </div>
    </>
}

async function onSubmit(values: any, reset: any) {
    fetch(
        `/api/administrator/categories/create`,
        {
            method: "POST",
            body: JSON.stringify(values)
        }
    )
        .then(
            response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.statusText);
                }
            }
        ).then(data => {
            if (data.success) {
                toast.success("Категория создана");
                reset();
                reset({
                    category_video: [],
                });
            } else {
                toast.error("Что-то пошло не так #f484n");
            }
        })
        .catch(error => {
            toast.error("Что-то пошло не так #f784ns");
        });
}