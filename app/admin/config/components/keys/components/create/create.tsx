"use client";

import ts_keys4create from "#app/admin/config/types/ts_keys4create.ts";
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
          Create key
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
  const { register, handleSubmit } = useForm<ts_keys4create>({
    defaultValues: {
      SQLString,
      name: "keyName",
      title: "Заголовок",
      description: "Описание ключа",
      idConfig: 1,
    },
  });
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-2">
          <div>
            <strong>Название ключа (лат.)</strong>
          </div>
          <div>
            <input
              {...register("name", { required: true })}
              className="form-control"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="mt-2">
          <div>
            <strong>Название таблицы</strong>
          </div>
          <div>
            <input
              {...register("tableName", { required: true })}
              className="form-control"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="mt-2">
          <div>
            <strong>Заголовок</strong>
          </div>
          <div>
            <input
              {...register("title", { required: true })}
              className="form-control"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="mt-2">
          <div>
            <strong>Описание</strong>
          </div>
          <div>
            <input
              {...register("description", { required: true })}
              className="form-control"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="mt-2">
          <div>
            <strong>SQLString</strong>
          </div>
          <div>
            <textarea
              rows={4}
              {...register("SQLString", { required: true })}
              className="form-control"
              autoComplete="off"
              style={{ width: "1000px" }}
            />
          </div>
        </div>
        <div className="mt-2">
          <div>
            <strong>idConfig</strong>
          </div>
          <div>
            <input
              {...register("idConfig", { required: true })}
              className="form-control"
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

async function onSubmit(values: ts_keys4create) {
  const res: any = await fetch("/admin/api/keys/create", {
    method: "post",
    body: JSON.stringify(values),
  }).then((x) => x.json());
  if (res.error) {
    // alert(JSONl)
    alert(JSON.stringify({ err: res }, null, 2));
    // toast.error(res.error.code);
    return;
  }

  alert(JSON.stringify(res, null, 2));
}

const SQLString = `
  ALTER TABLE your_table_name
  ADD CONSTRAINT unique_key_name UNIQUE (column1, column2);
`;
