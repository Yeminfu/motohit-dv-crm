"use client";

import ts_procedure4create from "#app/admin/config/types/ts_procedure4create.ts";
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
          Create procedure
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
  const { register, handleSubmit } = useForm<ts_procedure4create>({
    defaultValues: {
      SQLString,
      name: "prodedureName",
      title: "Процедура для важных дел",
      idConfig: 1,
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-2">
          <div>
            <strong>Название процедуры (лат.)</strong>
          </div>
          <div>
            <input
              {...register("name", { required: true })}
              className="form-control w-auto"
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
              className="form-control w-auto"
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
              rows={20}
              {...register("SQLString", { required: true })}
              className="form-control w-auto"
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

async function onSubmit(values: ts_procedure4create) {
  const res: any = await fetch("/admin/api/procedures/create", {
    method: "post",
    body: JSON.stringify(values),
  }).then((x) => x.json());
  if (res.error) {
    toast.error(res.error.code);
    return;
  }

  alert(JSON.stringify(res, null, 2));
}

const SQLString = `
  create procedure procedureName (
    in value varchar(250)
  ) 
  begin
    set @value = value;
    set @sql = concat('select " ', @value,'"');
    prepare stmt from @sql;
    execute stmt;
    deallocate prepare stmt;
  end
`;
