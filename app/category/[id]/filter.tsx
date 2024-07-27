import { useForm } from "react-hook-form";

interface ts_inputs {
    name: string
}

export default function Filter() {
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

                <form onSubmit={x => {
                    console.log('x', x);
                }}>
                    <div className="d-flex">
                        <input {...register("name", { required: true })} placeholder="Наименование/код" className="form-control w-auto" autoComplete="off" />
                        <button className="btn btn-dark ms-2 btn-sm" >Фильтр</button>
                    </div>
                </form>
            </div>
        </div>
    </>
}