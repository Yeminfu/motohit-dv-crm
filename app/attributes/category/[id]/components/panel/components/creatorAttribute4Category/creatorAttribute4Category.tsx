"use client";

import { useForm } from "react-hook-form";
import onSubmit from "./utils/onSubmit";
import ts_fields from "./types/ts_fields";

export default function CreatorAttribute4Category(props: {
  idCategory: number;
}) {
  const { register, handleSubmit } = useForm<ts_fields>();
  return (
    <>
      <form
        onSubmit={handleSubmit(async (values) => {
          const res = await onSubmit(values);
          console.log("res", res);
        })}
      >
        <table className="table w-auto">
          <tbody>
            <tr>
              <th>Название атрибута</th>
              <td>
                <input
                  {...register("attribute_name", { required: true })}
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
