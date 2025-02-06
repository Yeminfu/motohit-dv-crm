"use client";

import ts_keyFromDB from "#app/admin/config/types/ts_keyFromDB.ts";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Edit(props: ts_keyFromDB) {
  const { register, handleSubmit } = useForm<ts_keyFromDB>({
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
            <strong>Таблица</strong>
          </div>
          <div>
            <input
              {...register("tableName")}
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
              rows={2}
            />
          </div>
        </div>
        <div className="mt-2">
          <div>
            <strong>description</strong>
          </div>
          <div>
            <textarea
              {...register("description")}
              className="form-control w-100"
              autoComplete="off"
              rows={2}
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

async function onSubmit(values: ts_keyFromDB) {
  const res: any = await fetch("/admin/api/keys/edit", {
    method: "post",
    body: JSON.stringify(values),
  }).then((x) => x.json());
  if (res.error) {
    toast.error(res.error.code);
    return;
  }
  toast.info(<>{JSON.stringify(res, null, 2)}</>);
}
