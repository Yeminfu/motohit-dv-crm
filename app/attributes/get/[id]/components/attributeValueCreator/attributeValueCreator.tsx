"use client";

import { useForm } from "react-hook-form";
import ts_inputs from "./types/ts_inputs";

export default function AttributeValueCreator(props: { idAttribute: number }) {
  const { register, handleSubmit } = useForm<ts_inputs>();
  return (
    <>
      <form
        onSubmit={handleSubmit(async (values) => {
          alert();
          // const res = await onSubmit({
          //   idAttribute: props.idAttribute,
          //   value_name: values.value_name,
          // });
          // console.log("res", res);
        })}
      >
        <input
          {...register("idAttribute", { required: true })}
          className="d-none"
          autoComplete="off"
        />
        <div className="form-group">
          <label>Значение атрибута</label>
          <input
            {...register("value_name", { required: true })}
            className="form-control w-auto"
            autoComplete="off"
          />
        </div>

        <div className="mt-2">
          <button className="btn btn-dark btn-sm">Сохранить</button>
        </div>
      </form>
    </>
  );
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
}
