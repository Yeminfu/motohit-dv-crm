"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ts_config4create from "../../types/ts_config4create";

export default function CreateConfig() {
  const { register, handleSubmit } = useForm<ts_config4create>();
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="bable w-auto">
          <tbody>
            <tr>
              <th>Название конфигурации</th>
              <td>
                <input
                  {...register("name")}
                  className="form-control w-auto"
                  autoComplete="off"
                />
              </td>
            </tr>
            <tr>
              <th>Описание</th>
              <td>
                <textarea
                  {...register("description", { required: true })}
                  className="form-control w-auto"
                  autoComplete="off"
                />
              </td>
            </tr>
            <tr>
              <th>Родительская конфигурация</th>
              <td>
                <input
                  {...register("idParent", { required: true })}
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

async function onSubmit(values: ts_config4create) {
  const res: any = await fetch("/admin/api/configuration/create", {
    method: "post",
    body: JSON.stringify(values),
  }).then((x) => x.json());
  if (res.error) {
    toast.error(res.error.code);
    return;
  }
}