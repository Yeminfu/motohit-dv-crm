"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";

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

interface ts_formValues {
  procedureName: string;
  title: string;
  SQLString: string;
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
              <th>Название процедуры (лат.)</th>
              <td>
                <input
                  {...register("procedureName")}
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
                  {...register("SQLString")}
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

async function onSubmit(values: ts_formValues) {
  // const _class = {
  //   className: values.className,
  //   title: values.title,
  // };
  // const res: any = await fetch("/admin/api/classes/create", {
  //   method: "post",
  //   body: JSON.stringify(_class),
  // }).then((x) => x.json());
  // if (res.error) {
  //   toast.error(res.error.code);
  //   return;
  // }
}
