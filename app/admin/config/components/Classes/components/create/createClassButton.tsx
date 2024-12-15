"use client";

import dbWorker from "#db/dbWorker.js";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CreateClassButton() {
  const [isOpen, setOpen] = useState(false);
  if (!isOpen)
    return (
      <>
        <button
          onClick={() => {
            setOpen(true);
            // const _class = {
            //   id: 1,
            //   className: `chbfs_products`,
            // };
            // fetch("/admin/api/classes/create", {
            //   method: "post",
            //   body: JSON.stringify(_class),
            // })
            //   .then((x) => x.json())
            //   .then(console.log);
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
                  {...register("className")}
                  className="form-control w-auto"
                  autoComplete="off"
                />
              </td>
            </tr>
            <tr>
              <th>Заголово</th>
              <td>
                <input
                  {...register("title")}
                  className="form-control w-auto"
                  autoComplete="off"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-2">
          <button className="btn btn-dark btn-sm">Фильтр</button>
        </div>
      </form>
    </>
  );
}

async function onSubmit(values: ts_formValues) {
  const _class = {
    className: values.className,
    title: values.title,
  };
  fetch("/admin/api/classes/create", {
    method: "post",
    body: JSON.stringify(_class),
  })
    .then((x) => x.json())
    .then(console.log);
}
