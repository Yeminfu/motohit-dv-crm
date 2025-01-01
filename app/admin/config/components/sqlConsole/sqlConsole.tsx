"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface values4sql {
  sql: string;
}

export default function SQLConsole() {
  const { register, handleSubmit } = useForm<values4sql>();
  return (
    <>
      <form onSubmit={handleSubmit((values) => onSubmit(values))}>
        <>
          <textarea
            {...register("sql", { required: true })}
            className="form-control "
            autoComplete="off"
          />
          <div className="mt-2">
            <button className="btn btn-dark btn-sm">Go</button>
          </div>
        </>
      </form>
    </>
  );
}

async function onSubmit(values: values4sql) {
  try {
    const response = await fetch(`/admin/api/sql`, {
      method: "post",
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const data = await response.json();
    console.log("data", data);

    if (data.error) {
      alert("Ошибка: #asdk8: " + data.error?.code);
      return;
    }

    if (data.result) {
      toast.success("Колонка сохранена");
      return;
    }
  } catch (error: any) {
    alert("err #kasd983");
  }
}
