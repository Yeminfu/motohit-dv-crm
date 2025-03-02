"use client";

import ts_scalarFunction4create from "#app/admin/config/types/ts_scalarFunction4create.ts";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Create() {
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
          Create scalar function
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

function Form() {
  const { register, handleSubmit } = useForm<ts_scalarFunction4create>({
    defaultValues: {
      SQLString,
      name: "scalarFunctionName",
      title: "Заголовок",
      description: "Описание функции",
      idConfig: 1,
    },
  });
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h4>Заголовок</h4>
          <div>
            <input
              {...register("title", { required: true })}
              className="form-control"
              autoComplete="off"
            />
          </div>
        </div>
        <div>
          <h4>Название функции</h4>
          <div>
            <input
              {...register("name", { required: true })}
              className="form-control"
              autoComplete="off"
            />
          </div>
        </div>

        <div>
          <h4>Описание</h4>
          <div>
            <input
              {...register("description", { required: true })}
              className="form-control "
              autoComplete="off"
            />
          </div>
        </div>

        <div>
          <h4>SQLString</h4>
          <div>
            <textarea
              rows={20}
              {...register("SQLString", { required: true })}
              className="form-control"
              autoComplete="off"
              style={{ width: "1000px" }}
            />
          </div>
        </div>

        <div>
          <h4>idConfig</h4>
          <div>
            <input
              {...register("idConfig", { required: true })}
              className="form-control w-auto"
              autoComplete="off"
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

async function onSubmit(values: ts_scalarFunction4create) {
  const res: any = await fetch("/admin/api/scalarFunctions/create", {
    method: "post",
    body: JSON.stringify(values),
  }).then((x) => x.json());
  if (res.error) {
    toast.error(res.error.code);
    return;
  }

  alert(JSON.stringify(res, null, 2));
}

const SQLString = `create function scalarFunctionName (num int)
returns int
deterministic
begin
  return num * num;
end
`;
