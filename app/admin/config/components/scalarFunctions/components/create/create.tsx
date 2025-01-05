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
  // return null;
  const { register, handleSubmit } = useForm<ts_scalarFunction4create>({
    defaultValues: {
      SQLString,
      name: "scalarFunctionName",
    },
  });
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="bable w-auto">
          <tbody>
            <tr>
              <th>Название скалярки (лат.)</th>
              <td>
                <input
                  {...register("name")}
                  className="form-control w-auto"
                  autoComplete="off"
                />
              </td>
            </tr>
            <tr>
              <th>Заголовок</th>
              <td>
                <input
                  {...register("title")}
                  className="form-control w-auto"
                  autoComplete="off"
                />
              </td>
            </tr>
            <tr>
              <th>SQLString</th>
              <td>
                <textarea
                  rows={20}
                  {...register("SQLString")}
                  className="form-control w-auto"
                  autoComplete="off"
                  style={{ width: "1000px" }}
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

async function onSubmit(values: ts_scalarFunction4create) {
  const _class = {
    procedureName: values.name,
    title: values.title,
    SQLString: values.SQLString,
  };
  const res: any = await fetch("/admin/api/scalarFunctions/create", {
    method: "post",
    body: JSON.stringify(_class),
  }).then((x) => x.json());
  if (res.error) {
    toast.error(res.error.code);
    return;
  }

  alert(JSON.stringify(res, null, 2));
}

const SQLString = `
  create function scalarFunctionName (num int)
  returns int
  deterministic
  begin
    return num * num;
  end
`;
