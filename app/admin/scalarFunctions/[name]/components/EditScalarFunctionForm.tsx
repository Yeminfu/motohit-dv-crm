"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ts_scalarFunction4Edit from "../types/ts_scalarFunction4Edit";

export default function EditScalarFunctionForm(props: ts_scalarFunction4Edit) {
  const { register, handleSubmit } = useForm<ts_scalarFunction4Edit>({
    defaultValues: {
      ...props,
    },
  });
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <strong>Процедура</strong>
          </div>
          <div>
            <input
              {...register("name")}
              className="form-control "
              autoComplete="off"
            />
          </div>
        </div>
        <div>
          <div>
            <strong>Заголовок</strong>
          </div>
          <div>
            <input
              {...register("title")}
              className="form-control "
              autoComplete="off"
            />
          </div>
        </div>
        <div>
          <div>
            <strong>Описание</strong>
          </div>
          <div>
            <input
              {...register("description")}
              className="form-control "
              autoComplete="off"
            />
          </div>
        </div>
        <div className="mt-2">
          <div>
            <strong>Определение</strong>
          </div>
          <div>
            <textarea
              {...register("SQLString")}
              className="form-control w-100"
              autoComplete="off"
              rows={20}
            />
          </div>
        </div>
        <div className="mt-2">
          <button className="btn btn-dark btn-sm">Сохранить</button>
        </div>
      </form>
    </>
  );
}

async function onSubmit(values: ts_scalarFunction4Edit) {
  const res: any = await fetch("/admin/api/procedures/edit", {
    method: "post",
    body: JSON.stringify(values),
  }).then((x) => x.json());
  if (res.error) {
    toast.error(res.error.code);
    return;
  }
  toast.info(<>{JSON.stringify(res, null, 2)}</>);
}
