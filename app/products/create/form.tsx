"use client"

import { Fragment, useEffect, useState } from "react"
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form"
import { createEvent, createStore } from "effector"
import { useStore } from "effector-react"
// import { updateAttributesByCategoryId } from "./updateAttributesByCategoryId"
import { toast } from 'react-toastify';
// import stock_statuses from "@/src/components/stock_statuses"
import Image from "next/image"
// import TextEditor from "@/src/components/text-editor/TextEditor"
import { CategoryFromDBInterface } from "@/src/app/types/categories"
import TextEditor from "@/tools/text-editor/TextEditor"
import stock_statuses from "@/tools/stock_statuses"

export interface AttributeType {
    attribute_id: number
    attribute_value_id: number | ""
}


interface AttributesFromServer {
    attribute_id: number
    attribute_name: string
    values: {
        value_id: number
        value_name: string
    }[]
}

type Inputs = {
    product_name: string
    price: number
    description: string
    short_description: string
    category: number
    stock_status: number
    attributes: AttributeType[]
    images: any
    video: string[]
    videoAppender: string
}

export const setAttributes = createEvent<AttributesFromServer[]>();
const $attributes = createStore<AttributesFromServer[]>([])
    .on(setAttributes, (_, v) => v);

export default function CreateProductForm({ categories }: { categories: CategoryFromDBInterface[] }) {

    const { register, handleSubmit, getValues, control, setValue } = useForm<Inputs>({});

    const { fields: attributesFields, append: appendAttribute } = useFieldArray({ control, name: "attributes" });

    const { fields: videoFields, append: appendVideo, remove: removeVideo } = useFieldArray({ control, name: "videos" });

    const [previewImages, setPreviewImages] = useState([]);

    const handleImageChange = async (e: any) => {
        const files = e.target.files;
        const newImages: any = Array.from(previewImages);
        for (let i = 0; i < files.length; i++) {
            const imageBase64 = await new Promise(r => {
                const file = files[i];
                const reader = new FileReader();
                reader.onload = () => {
                    const previewImage = reader.result;
                    r(previewImage);
                };
                reader.readAsDataURL(file);
            });
            newImages.push(imageBase64);
        }
        setPreviewImages(newImages);
    };

    const attributesStore = useStore($attributes);

    useEffect(() => {
        attributesStore.forEach(attribute => {
            appendAttribute({
                attribute_id: attribute.attribute_id,
                attribute_value_id: "",
            });
        });
    }, [attributesStore, appendAttribute])

    const [descriptionState, setDescriptionState] = useState("");

    return <>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='row mb-2'>
                <div className="col-lg-2 ">Наименование </div>
                <div className="col-lg-7">
                    <input {...register('product_name'/* , { required: true } */)} className="form-control" autoComplete="off" />
                </div>
            </div>
            <div className='row mb-2'>
                <div className="col-lg-2 ">Цена </div>
                <div className="col-lg-7">
                    <input type="number" {...register("price"/* , { required: true } */)} className="form-control" autoComplete="off" />
                </div>
            </div>
            <div className='row mb-2'>
                <div className="col-lg-2 ">Статус наличия </div>
                <div className="col-lg-7">
                    <select className="form-control" {...register("stock_status")}>
                        <option value={""}>Выберите значение</option>
                        {stock_statuses
                            .map((stock_status) => <Fragment key={stock_status.id} >
                                <option value={stock_status.id}>{stock_status.status}</option>
                            </Fragment>)}
                    </select>
                </div>
            </div>
            <div className='row mb-2'>
                <div className="col-lg-2 ">Описание </div>
                <div className="col-lg-7">
                    <TextEditor description={descriptionState} updateDescription={(html: string) => {
                        setDescriptionState(html);
                        setValue("description", html)
                    }} />
                </div>
            </div>
            <div className='row mb-2'>
                <div className="col-lg-2 ">Краткое описание </div>
                <div className="col-lg-7">
                    <textarea {...register('short_description')} className="form-control" autoComplete="off" />
                </div>
            </div>
            <div className='row mb-2'>
                <div className="col-lg-2 ">Категория </div>
                <div className="col-lg-7">
                    <select className="form-control" {...register("category", {
                        onChange: (e) => {
                            if (e.target.value) {
                                setValue("attributes", []);
                                updateAttributesByCategoryId(e.target.value);
                            }
                        }
                    })}>
                        <option value={""}>Выберите категорию</option>
                        {(Array.isArray(categories)) && categories?.map((category, i: any) => <Fragment key={category.id} >
                            <option value={category.id}>{category.category_name}</option>
                        </Fragment>)}
                    </select>
                </div>
            </div>
            <div className='row mb-2'>
                <div className="col-lg-2 ">Атрибуты </div>
                <div className="col-lg-7">
                    <table className="table table-bordered">
                        <tbody>
                            {attributesFields
                                .map(
                                    (formAttribute, i) => {
                                        const attributeFromServer = attributesStore.find(attribute => attribute.attribute_id === formAttribute.attribute_id);
                                        if (!attributeFromServer) {
                                            return <tr key={formAttribute.id}><td>Ошибка #mvof84b</td></tr>
                                        }
                                        return <tr key={formAttribute.id}>
                                            <td>
                                                <strong>{attributeFromServer.attribute_name}</strong>
                                                <input
                                                    key={attributeFromServer.attribute_id} // important to include key with field's id
                                                    {...register(`attributes.${i}.attribute_id`)}
                                                    className="d-none"
                                                />
                                            </td>
                                            <td>
                                                {(() => {
                                                    return <select {...register(`attributes.${i}.attribute_value_id`)} className="form-control">
                                                        <option value={""}>выберите значение</option>
                                                        <>{attributeFromServer.values.map((attribute, i) => <Fragment key={attribute.value_id} >
                                                            <option value={attribute.value_id}>{attribute.value_name}</option>
                                                        </Fragment>)}</>
                                                    </select>
                                                })()}
                                            </td>
                                        </tr>
                                    }
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='row mb-2'>
                <div className="col-lg-2 ">Изображения </div>
                <div className="col-lg-7">
                    <div>
                        <input type="file" multiple {...register("images"/* , { required: true } */)} onChange={handleImageChange} />
                        <div>
                            {previewImages.map((image, index) => (
                                <div className="m-2 p-2 border border-dark" key={index}>
                                    <Image
                                        loader={() => image}
                                        src={image}
                                        alt=""
                                        width={0}
                                        height={0}
                                        style={{
                                            width: "auto",
                                            height: "auto",
                                            marginBottom: 5,
                                            cursor: "pointer",
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mb-2'>
                <div className="col-lg-2 ">Видео YouTube</div>
                <div className="col-lg-7">
                    <div>
                        <div className="d-flex">
                            <input placeholder="Ссылка на видео" {...register('videoAppender'/* , { required: true } */)}
                                className="form-control" autoComplete="off" />
                            <div className="btn btn-sm btn-dark text-nowrap" onClick={() => {
                                const { videoAppender: url } = getValues();
                                appendVideo({ url });
                                setValue("videoAppender", "");
                            }}>Добавить видео</div>
                        </div>
                        <div>
                            <ul className="list-group">
                                {videoFields.map(({ url, id }: any, i) => <div key={id}>
                                    <li className="list-group-item">
                                        <div className="d-flex">
                                            <iframe className="mw-100" src={url} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen width="500" height="281"></iframe>
                                            <div className="btn btn-danger d-flex"
                                                onClick={() => {
                                                    removeVideo(i);
                                                }}
                                            >удалить</div>
                                        </div>
                                    </li>
                                </div>)}

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <button className="btn btn-sm btn-outline-dark">Сохранить</button>
        </form >
    </>
}



const onSubmit: SubmitHandler<Inputs> = (data) => {


    const formData = new FormData();

    const images = data.images;


    if ([undefined, ""].includes(data.product_name)) {
        toast.error('Нужно прописать название товара')
        return;
    }
    if ([undefined, ""].includes(data.description)) {
        toast.error('Нужно прописать описание товара')
        return;
    }

    if ([undefined, ""].includes(String(data.price))) {
        toast.error('Нужно прописать цену товара')
        return;
    }

    if ([undefined, ""].includes(data.description)) {
        toast.error('Нужно заполнить описание')
        return;
    }
    if ([undefined, ""].includes(data.short_description)) {
        toast.error('Нужно заполнить краткое описание')
        return;
    }

    if ([undefined, ""].includes(String(data.category))) {
        toast.error('Нужно выбрать категорию товара')
        return;
    }

    if ([undefined, ""].includes(String(data.stock_status))) {
        toast.error('Нужно выбрать статус наличия')
        return;
    }

    const attributes_values = data.attributes.map(({ attribute_value_id }) => attribute_value_id);

    if (attributes_values.find(value => value === "") !== undefined) {
        toast.error('Нужно заполнить все атрибуты')
        return;
    }

    if (!images.length) {
        toast.error('Нужно добавить картинки')
        return;
    }

    formData.append('product_name', data.product_name);
    formData.append('category', String(data.category));
    formData.append('description', data.description);
    formData.append('short_description', data.short_description);
    formData.append('price', String(data.price));
    formData.append('stock_status', String(data.stock_status));
    formData.append('attributes', JSON.stringify(data.attributes));

    for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
    }

    fetch('/api/products/create', {
        method: 'POST',
        body: formData
    })
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
                toast.success("Товар создан");
            } else {
                toast.error("Что-то пошло не так #f8s4n " + data.error);
            }
        })
        .catch(error => {
            toast.error("Что-то пошло не так #f8v4ns");
        });

}