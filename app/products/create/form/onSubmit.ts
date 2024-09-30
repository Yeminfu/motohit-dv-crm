import { SubmitHandler } from "react-hook-form";
import { toast } from 'react-toastify';
import Inputs from "./Inputs";


export default async function onSubmit(data: Inputs) {


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