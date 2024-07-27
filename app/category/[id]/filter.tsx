import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

interface ts_inputs {
    name: string
}
export default function Filter() {
    const router = useRouter()

    const pathname = usePathname()

    async function onSubmit(x: any) {
        console.log('x', x);
        router.push(`${pathname}?name=${x.name}`)
    }

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<ts_inputs>({

        defaultValues: {
            // "name": props.product.name,
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