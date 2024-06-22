"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"

type Inputs = {
    code: string
}

export default function ConfirmForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        fetch(
            `/api/auth/confirm`,
            {
                method: "POST",
                body: JSON.stringify(data)
            }
        ).then(
            response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.statusText);
                }
            }
        ).then(data => {// , { sameSite:'strict' }
            if (data.success) {
                document.cookie = `auth=${data.token}; expires=Tue, 19 Jan 2038 03:14:07 GMT; SameSite=Strict;`;
                // toast.success("Вы успешно авторизировались;");
                window.location.pathname = "/";
            } else {
                toast.error("Что-то пошло не так");
            }
        })
            .catch(() => {
                toast.error("Что-то пошло не так #fk5nc");
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
            <input  {...register("code")} className="form-control " style={{ maxWidth: "300px" }} autoComplete="off" placeholder="Введите код подтверждения" />
            <button className="btn btn-sm btn-outline-dark mt-2">Ввод</button>
        </form>
    )
}