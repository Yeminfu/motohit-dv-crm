// import ts_column4create from "#app/admin/classes/types/ts_column4create.js";
// import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

interface ts_view4create {
  idClass: number;
  name: string;
}

export default function CreateView4Class(props: { idClass: number }) {
  const { register, handleSubmit } = useForm<ts_view4create>({
    defaultValues: {
      idClass: props.idClass,
      // "name": props.searchParams.name,
    },
  });
  return (
    <>
      <div className="card">
        <div className="card-header">Создать view</div>
        <div className="card-body">
          <form
            onSubmit={handleSubmit((values) => {
              onSubmit(values);
              // onSubmit({ column, className: props.className })
            })}
          >
            <table className="table w-auto">
              <tbody>
                <tr>
                  <th>Название</th>
                  <td>
                    <input
                      {...register("name", { required: true })}
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
        </div>
      </div>
    </>
  );
}

async function onSubmit(values: ts_view4create) {
  try {
    const response = await fetch(`/admin/api/dbViews/create`, {
      method: "post",
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const data = await response.json();
    if (data.error) {
      alert("Ошибка: #dsdj3ns: " + data.error?.code);
      return;
    }
    if (data.result) {
      toast.success("Успех");
      return;
    }
  } catch (error: any) {
    alert("err #dkd93n");
  }
}
