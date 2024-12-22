"use client";

import ts_column4create from "#app/admin/classes/types/ts_column4create.ts";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateNewField(props: { className: string }) {
  const { register, handleSubmit } = useForm<ts_column4create["column"]>({
    defaultValues: {
      // "name": props.searchParams.name,
    },
  });
  return (
    <>
      <form
        onSubmit={handleSubmit((column) =>
          onSubmit({ column, className: props.className })
        )}
      >
        <table className="bable w-auto">
          <tbody>
            <tr>
              <th>Название</th>
              <td>
                <input
                  {...register("COLUMN_NAME", { required: true })}
                  className="form-control w-auto"
                  autoComplete="off"
                />
              </td>
            </tr>
            <tr>
              <th>Тип</th>
              <td>
                <select
                  {...register(`DATA_TYPE`, {
                    required: true,
                  })}
                  className="form-control"
                >
                  <option value={""}>выберите значение</option>
                  <>
                    {["int", "varchar", "text", "date"].map((typeName) => (
                      <Fragment key={typeName}>
                        <option value={typeName}>{typeName}</option>
                      </Fragment>
                    ))}
                  </>
                </select>
              </td>
            </tr>
            <tr>
              <th>CHARACTER_MAXIMUM_LENGTH</th>
              <td>
                <input
                  {...register(`CHARACTER_MAXIMUM_LENGTH`, {
                    // required: true,
                  })}
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <th>Может быть null</th>
              <td>
                <select
                  {...register(`IS_NULLABLE`, {
                    required: true,
                  })}
                  className="form-control"
                >
                  <option value={""}>выберите значение</option>
                  <>
                    {["1", "0"].map((typeName) => (
                      <Fragment key={typeName}>
                        <option value={typeName}>{typeName}</option>
                      </Fragment>
                    ))}
                  </>
                </select>
              </td>
            </tr>
            <tr>
              <th>Значение по умолчанию</th>
              <td>
                <input
                  {...register(`COLUMN_DEFAULT`, {
                    // required: true,
                  })}
                  className="form-control"
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

async function onSubmit(values: ts_column4create) {
  try {
    const response = await fetch(`/admin/api/classes/fields/create`, {
      method: "post",
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const data = await response.json();
    console.log("data", data);

    if (data.error) {
      alert("Ошибка: #d9dk3h: " + data.error?.code);
      return;
    }

    if (data.result) {
      toast.success("Колонка сохранена");
      return;
    }
  } catch (error: any) {
    alert("err #d9sj3nb");
  }
}
