"use client";

import { Controller, useForm } from "react-hook-form";
import ts_booleanField from "./types/ts_booleanField";
import updateFieldValue from "./utils/updateFieldValue";

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
                await updateFieldValue(
                  props.idAttribute,
                  props.fieldName,
                  Boolean(Number(e.target.value))
                );
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
