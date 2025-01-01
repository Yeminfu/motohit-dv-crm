"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ts_procedure4Edit from "../types/ts_procedure4Edit";

export default function EditProcedureForm(props: ts_procedure4Edit) {
  const { register, handleSubmit } = useForm<ts_procedure4Edit>({
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
              {...register("Procedure")}
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
              {...register("Create Procedure")}
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

async function onSubmit(values: ts_procedure4Edit) {
  const res: any = await fetch("/admin/api/procedures/edit", {
    method: "post",
    body: JSON.stringify(values),
  }).then((x) => x.json());
  if (res.error) {
    toast.error(res.error.code);
    return;
  }
}
