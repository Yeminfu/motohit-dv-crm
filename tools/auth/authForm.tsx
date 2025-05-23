"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { setAuthStep } from "./startAuth";

type Inputs = {
  login: string;
};

export default function AuthForm() {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch(`/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        if (data.success) {
          setAuthStep(2);
        } else {
          toast.error("Что-то пошло не так #fjn63");
        }
      })
      .catch(() => {
        toast.error("Что-то пошло не так #v95nb");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
      <input
        {...register("login")}
        className="form-control "
        style={{ maxWidth: "300px" }}
        autoComplete="off"
        placeholder="Введите логин"
      />
      <button className="btn btn-sm btn-outline-dark mt-2">Ввод</button>
    </form>
  );
}
