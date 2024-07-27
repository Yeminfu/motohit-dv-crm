"use client"
import { useForm } from "react-hook-form";
// import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import ts_categoryFilter from "@/types/ts_categoryFilter";

interface ts_inputs {
    name: string
}

export default function Filter(props: { searchParams: ts_categoryFilter }) {
    if (typeof window === 'undefined') return null;
    const pathname = usePathname();

    const domain = window.location.origin;

    async function onSubmit(x: any) {
        const newpathname = pathname + (x.name ? `?name=${x.name}` : '');
        window.location.href = domain + '/' + newpathname;
    }

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<ts_inputs>({

        defaultValues: {
            "name": props.searchParams.name,
        }
    });

    return <>
        <div className="my-3">
            <div className="shadow p-2">
                <div><strong>Фильтр</strong></div>

                <form onSubmit={handleSubmit(onSubmit)}                >
                    <div className="d-flex">
                        <input {...register("name")} placeholder="Наименование/код" className="form-control w-auto" autoComplete="off" />
                        <button className="btn btn-dark ms-2 btn-sm" >Фильтр</button>
                    </div>
                </form>
            </div>
        </div>
    </>
}