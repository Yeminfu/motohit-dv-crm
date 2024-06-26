import { PriceTypesFromDBInterface } from "@/types/products/priceTypesFromDBInterface";
import { ProductFromDB, ProductsFull } from "@/types/products/prodyctType";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function EditProductForm(props: {
    product: ProductsFull,
    priceTypes: PriceTypesFromDBInterface[],
}) {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<any>({

        defaultValues: {
            idProduct: props.product.id,
            "name": props.product.name,
            "color": props.product.color,
            "code": props.product.code,
            "purchase_price": props.product.purchase_price,
            "cost_price": { "type": props.product.idCostPriceType, "value": props.product.costPriceValue },
            "note": props.product.note,
            "idCategory": props.product.idCategory,
        }
    });


    const { fields: retailPriceFields, append: appendRetailPrice }: any = useFieldArray<any>({
        control,
        name: "retail_price",
    });

    const { fields: stockFields, append: appendStock }: any = useFieldArray<any>({
        control,
        name: "stock",
    });

    useEffect(() => {
        const { retailPrices, stock } = props.product;
        for (let index = 0; index < retailPrices.length; index++) {
            const retailPriceObj = retailPrices[index];
            appendRetailPrice({
                idInDB: retailPriceObj.id,
                ...retailPriceObj
            });
        }
        for (let index = 0; index < stock.length; index++) {
            const stockObj = stock[index];
            appendStock({
                idInDB: stockObj.id,
                ...stockObj
            });
        }
    }, [props.product])

    return <>
        <form onSubmit={handleSubmit(async x => {
            await onSubmit(x);
        })}>
            <div className="row">
                <div className="col">
                    <div className="mb-2">
                        <div><b>Название товара</b></div>
                        <input {...register("name", { required: true })} placeholder="" className="form-control" autoComplete="off" />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-2">
                        <div><b>Цвет</b></div>
                        <select {...register("color", { required: true })} className="form-select" autoComplete="off" >
                            <option value="">Цвет</option>
                            <option value="black" style={{ color: "black" }}>Черный</option>
                            <option value="green" style={{ color: "green" }}>Зеленый</option>
                            <option value="red" style={{ color: "red" }}>Красный</option>
                            <option value="blue" style={{ color: "blue" }}>Синий</option>
                            <option value="brown" style={{ color: "brown" }}>Коричневый</option>
                            <option value="orange" style={{ color: "orange" }}>Рыжий</option>
                        </select>
                    </div>
                </div>
                <div className="col">
                    <div className="mb-2">
                        <div><b>Код товара</b></div>
                        <input {...register("code", { required: true })} className="form-control" autoComplete="off" />
                    </div>
                </div>
            </div>

            {/*Закупочная цена*/}
            <div className="mb-2">
                <div><b>Закупочная цена</b></div>
                <input {...register("purchase_price", { required: true, pattern: /^\d+$/i })} className="form-control" autoComplete="off" />
            </div>

            <div className="mt-3">
                <h5>Себестоимость</h5>
                <div className="row">
                    <div className="col-6">
                        <div><b>Тип</b></div>
                        <select {...register("cost_price.type", { required: true })} className="form-select" autoComplete="off" >
                            <option value="">-</option>
                            {props.priceTypes.map(priceType => <option value={priceType.id} key={priceType.id}>{priceType.priceType}</option>)}
                        </select>
                    </div>
                    <div className="col-6">
                        <div><b>Значение</b></div>
                        <input {...register("cost_price.value", { required: true, pattern: /^\d+$/i })} className="form-control" autoComplete="off" />
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <h5>Розн. цена</h5>
                <>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Тип р.ц.</th>
                                <th>Значение р.ц.</th>
                            </tr>
                        </thead>
                        <tbody>
                            <>
                                {retailPriceFields.map((shopPriceObj: any, index: any) => {
                                    return <tr key={shopPriceObj.id}>
                                        <td>
                                            {retailPriceFields[index].shopName}
                                        </td>
                                        <td>
                                            <select {...register(`retail_price[${index}].idPriceType`, { required: true })} className="form-select" autoComplete="off" >
                                                <option value="">-</option>
                                                {props.priceTypes.map(priceType => <option value={priceType.id}>{priceType.priceType}</option>)}
                                            </select>
                                        </td>
                                        <td>
                                            <input {...register(`retail_price[${index}].priceValue`, { required: true, pattern: /^[0-9]+$/igm })} className="form-control" autoComplete="off" />
                                        </td>
                                    </tr>
                                })}
                            </>
                        </tbody>
                    </table>
                </>
            </div>
            <div className="mt-3">
                <h5>Склад</h5>
                <>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th></th>
                                <th>К-во на складе</th>
                            </tr>
                        </thead>
                        <tbody>
                            <>
                                {stockFields.map((shop: any, index: any) => {
                                    return <tr key={shop.id}>
                                        <td>
                                            {stockFields[index].shopName}
                                        </td>
                                        <td>
                                            <input {...register(`stock[${index}].count`, {
                                                required: true,
                                                pattern: /^[0-9]+$/igm

                                            })} className="form-control" autoComplete="off" />
                                        </td>
                                    </tr>
                                })}
                            </>
                        </tbody>
                    </table>
                </>
            </div>

            <div><h5>Заметки</h5></div>
            <div>
                <textarea {...register("note", { required: true })} className="form-control" autoComplete="off" />
            </div>

            {/* <div><h5>Изображение</h5></div>
            <div>
                <div className="mt-2">
                    {previewImages.map((image, index) => (
                        <div className="" key={index}>
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
                <input type="file"  {...register("images")} onChange={handleImageChange} />

                {errors.images && <span className="text-danger">Обязательное поле</span>}
            </div> */}

            <div className="mt-4">
                <div className="d-flex">
                    <button className="btn btn-sm btn-primary">Сохранить</button>
                    <div className="btn btn-sm btn-danger ms-2" onClick={() => {
                        reset();
                        // props.closeFn(false);
                    }}>отмена</div>
                </div>
            </div>
        </form>
    </>
}


async function onSubmit(data: any) {
    const formData = new FormData();

    const mainProductFields: ProductFromDB = {
        id: data.idProduct,
        name: data.name,
        note: data.note,
        idCategory: data.idCategory,
        purchase_price: data.idCategory,
        idCostPriceType: data.cost_price.type,
        costPriceValue: data.cost_price.value,
        color: data.color,
        code: data.code,
    };
    formData.append('mainProductFields', JSON.stringify(mainProductFields));

    const retail_price = data.retail_price.map((priceObj: any) => ({
        ...priceObj,
        id: priceObj.idInDB
    }));
    formData.append('retail_price', JSON.stringify(retail_price));

    const stock = data.stock.map((stockObj: any) => ({
        ...stockObj,
        id: stockObj.idInDB
    }));
    formData.append('stock', JSON.stringify(stock));

    const createRes = await fetch("/api/products/edit/" + data.idProduct, {
        method: "POST",
        body: formData
    })
        .then(x => x.json());

    if (createRes.success) {
        toast.success('Данные товара изменены');
    } else {
        toast.error('Ошибка #94j \n' + JSON.stringify(createRes.errors, null, 2))
    }
}