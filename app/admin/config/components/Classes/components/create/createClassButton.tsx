"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateClassButton() {
  const [isOpen, setOpen] = useState(false);
  if (!isOpen)
    return (
      <>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="btn btn-outline-dark"
        >
          createClassButton
        </button>
      </>
    );

  return (
    <>
      <div className="my-2">
        <Form />
      </div>
    </>
  );
}

interface ts_formValues {
  className: string;
  title: string;
  description: string;
  idConfig: number;
}

function Form() {
  const { register, handleSubmit } = useForm<ts_formValues>({
    defaultValues: {
      // "name": props.searchParams.name,
    },
  });
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="bable w-auto">
          <tbody>
            <tr>
              <th>Название класса (лат.)</th>
              <td>
                <input
                  {...register("className", { required: true })}
                  className="form-control w-auto"
                  autoComplete="off"
                />
              </td>
            </tr>
            <tr>
              <th>Заголовок</th>
              <td>
                <input
                  {...register("title", { required: true })}
                  className="form-control w-auto"
                  autoComplete="off"
                />
              </td>
            </tr>
            <tr>
              <th>Описание</th>
              <td>
                <input
                  {...register("description", { required: true })}
                  className="form-control w-auto"
                  autoComplete="off"
                />
              </td>
            </tr>
            <tr>
              <th>idConfig</th>
              <td>
                <input
                  {...register("idConfig", { required: true })}
                  className="form-control w-auto"
                  autoComplete="off"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-2">
          <button className="btn btn-dark btn-sm">Сохранить</button>
        </div>
      </form>
    </>
  );
}

async function onSubmit(values: ts_formValues) {
  const res: any = await fetch("/admin/api/classes/create", {
    method: "post",
    body: JSON.stringify(values),
  }).then((x) => x.json());

  if (res.error) {
    toast.error(res.error.code);
    return;
  }
}
