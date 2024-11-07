"use client";

import { useEffect, useState } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import getCategoryAttributes from "./utils/getCategoryAttributes";
import ts_AttributeWithValues from "@/types/attributes/ts_attributesWithValues";

export default function Attributes(props: {
  idProduct: number;
  idCategory: number;
}) {
  // const { control, handleSubmit, setValue, getValues } = useForm();

  const {
    register,
    formState: { errors },
    getValues,
    control,
    setValue,
  } = useFormContext();

  const [categoryAttributes, setCategoryAttributes] = useState<
    ts_AttributeWithValues[]
  >([]);

  // useEffect(() => {
  //   console.log("idProduct", props.idProduct);
  // }, [props.idProduct]);

  useEffect(() => {
    (async () => {
      const attributes = await getCategoryAttributes(props.idCategory);
      setCategoryAttributes(attributes);
      console.log("attributes", attributes);
      attributes.forEach((attr) => {
        if (attr.values.length > 0) {
          setValue(`attributes[${attr.id}]`, attr.values[0].id);
        }
      });
    })();
  }, [props.idCategory]);

  // const onSubmit = (data: any) => {
  //   console.log(data);
  //   // Получаем значения поля attributes
  //   const attributeValues = getValues("attributes");
  //   console.log("Значения атрибутов:", attributeValues);
  // };

  return (
    <>
      <div
        className="btn btn-dark"
        onClick={() => {
          console.log(getValues("attributes"));
        }}
      >
        btn
      </div>
      {categoryAttributes.map((attr) => (
        <div key={attr.id}>
          <label>{attr.attribute_name}</label>
          <Controller
            name={`attributes[${attr.id}]`}
            control={control}
            render={({ field }) => (
              <select {...field}>
                <option value="">Выберите значение</option>
                {attr.values.map((value) => (
                  <option key={value.id} value={value.id}>
                    {value.value_name}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
      ))}
    </>
  );
}
