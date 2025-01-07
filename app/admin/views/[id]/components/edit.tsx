"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ts_view4edit from "../../types/ts_view4edit";

export default function Edit(props: ts_view4edit) {
  const { register, handleSubmit } = useForm<ts_view4edit>({
    defaultValues: {
      ...props,
    },
  });
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <strong>Представление (view)</strong>
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
            <strong>Title</strong>
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
            <strong>Description</strong>
          </div>
          <div>
            <textarea
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
              rows={10}
            />
          </div>
        </div>
        <div className="mt-2">
          <button className="btn btn-dark btn-sm">Сохранить</button>
        </div>
      </form>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </>
  );
}

async function onSubmit(values: ts_view4edit) {
  const res: any = await fetch("/admin/api/views/edit", {
    method: "post",
    body: JSON.stringify(values),
  }).then((x) => x.json());
  if (res.error) {
    toast.error(res.error.code);
    return;
  }
  toast.info(<>{JSON.stringify(res, null, 2)}</>);
}
