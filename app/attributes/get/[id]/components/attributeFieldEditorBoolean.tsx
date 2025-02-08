"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ts_booleanField from "./types/ts_booleanField";
import onSubmit from "./utils/onSubmit";

export default function AttributeFieldEditor(props: ts_booleanField) {
  const { register, handleSubmit } = useForm<{ value: string }>({
    defaultValues: {
      value: String(props.attributeInitValue),
    },
  });
  return (
    <>
      <form
        onSubmit={handleSubmit(async (x) => {
          // const { success, error } =
          await onSubmit(props.idAttribute, Boolean(x.value));
          // if (success) {
          //   toast.success("Товар создан");
          //   // reset();
          // } else {
          //   toast.error(error);
          // }
        })}
      >
        <select
          {...register(`value`, {
            required: true,
          })}
          className="form-select"
        >
          <>
            <option value={"0"}>нет</option>
            <option value={"1"}>да</option>
          </>
        </select>
      </form>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </>
  );
}
