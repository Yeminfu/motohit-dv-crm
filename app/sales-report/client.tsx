"use client"

import { ShopFromDB } from "@/types/shops/shopFromDBType"
import ts_reportItem from "./ts_reportItem"
import Price from "@/ui/price"
import { usePathname } from "next/navigation"
import { useForm } from "react-hook-form"
import ts_searchParams from "./ts_searchParams"
import { CategoryType } from "@/types/categories/categoryType"
import dayjs from "dayjs"

export default function Client(props: {
    shops: ShopFromDB[],
    report: ts_reportItem[],
    categories: CategoryType[],
    searchParams: ts_searchParams
}) {
    return <>
        <Filter searchParams={props.searchParams} categories={props.categories} />
        <table className="table table-bordered tablestriped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Нименование</th>
                    {props.shops.map(shop => <th key={shop.id}>{shop.shopName}</th>)}
                </tr>
            </thead>
            <tbody>
                {props.report.map(productSales => <tr key={productSales.idProduct}>
                    <td>{productSales.idProduct}</td>
                    <td>{productSales.productName}</td>
                    {productSales.sales.map(salePerShopObj => <td key={salePerShopObj.idshop}>
                        {salePerShopObj.count} /  <Price value={Number(salePerShopObj.sum)} />
                    </td>)}
                </tr>)}
                <tr></tr>
            </tbody>
        </table>
    </>
}

function Filter(props: { searchParams: ts_searchParams, categories: CategoryType[] }) {
    const defaultCategory = props.searchParams.idCategory || props.categories[0].id

    const startYear = 2023;

    const diff = dayjs().diff(dayjs(String(startYear), 'YYYY'), "year");

    const years = Array.from({ length: diff + 1 }, (a, b) => (startYear + b));

    const pathname = usePathname();
    const {
        register,
        handleSubmit,
    } = useForm<{
        category: string
        year: string
    }>({
        defaultValues: {
            "category": String(defaultCategory),
            "year": dayjs().format('YYYY'),
        }
    });

    if (typeof window === 'undefined') return null;

    const domain = window.location.origin;

    async function onSubmit(x: {
        category: string
        year: string
    }) {
        const qs = Object.entries(x).map(x => `${x[0]}=${x[1]}`).join('&');
        console.log('xxxxxxxx', qs);
        const newpathname = pathname + (qs.length ? `?${qs}` : '');
        window.location.href = domain + '/' + newpathname;
    }

    return <>
        <div className="my-3">
            <div className="shadow p-2">
                <div><strong>Фильтр</strong></div>
                <form onSubmit={handleSubmit(onSubmit)}                >
                    <div className="d-flex">

                        <select {...register("category", { required: true })} className="form-select w-auto" autoComplete="off" >
                            <option value="">Категория</option>
                            {props.categories.map(category => <option value={String(category.id)}>{category.name} {category.id}</option>)}
                        </select>

                        <select {...register("year", { required: true })} className="form-select w-auto" autoComplete="off" >
                            <option value="">Год</option>
                            {years.map(year => <option value={String(year)}>{year}</option>)}
                        </select>

                        <button className="btn btn-dark ms-2 btn-sm" >Фильтр</button>
                    </div>
                </form>
            </div>
        </div>
    </>
}