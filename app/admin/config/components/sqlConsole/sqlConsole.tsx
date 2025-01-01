"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

interface values4sql {
  sql: string;
}

export default function SQLConsole() {
  const { register, handleSubmit } = useForm<values4sql>();
  const [state, setState] = useState();
  return (
    <>
      <form
        onSubmit={handleSubmit(async (values) => {
          const res = await onSubmit(values);
          setState(res);
        })}
      >
        <>
          <textarea
            rows={5}
            {...register("sql", { required: true })}
            className="form-control "
            autoComplete="off"
          />
          <div className="mt-2">
            <button className="btn btn-dark btn-sm">Go</button>
          </div>
        </>
      </form>
      <div className="mt-2">
        <div className="shadow p-2">
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
      </div>
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

    // if (data.error) {
    //   alert("Ошибка: #asdk8: " + data.error?.code);
    //   return;
    // }
    return data;
    // if (data.result) {
    //   toast.success("Колонка сохранена");
    //   return;
    // }
  } catch (error: any) {
    alert("err #kasd983");
  }
}
