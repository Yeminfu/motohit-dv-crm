"use client";

import { Controller, useForm } from "react-hook-form";
import ts_booleanField from "./types/ts_booleanField";
import updateFieldValue from "./utils/updateFieldValue";
import { toast } from "react-toastify";

export default function AttributeFieldEditor(props: ts_booleanField) {
  const { control } = useForm<{ value: string }>({
    defaultValues: {
      value: String(props.attributeInitValue),
    },
  });
  return (
    <>
      <form>
        <Controller
          name="value"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select
              {...field}
              onChange={async (e) => {
                field.onChange(e);
                const res = await updateFieldValue({
                  idAttribute: props.idAttribute,
                  fieldName: props.fieldName,
                  attributeInitValue: Number(e.target.value),
                });
                toast.success(JSON.stringify(res));
              }}
              className="form-select"
            >
              <>
                <option value={"1"}>да</option>
                <option value={"0"}>нет</option>
              </>
            </select>
          )}
        />
      </form>
    </>
  );
}
