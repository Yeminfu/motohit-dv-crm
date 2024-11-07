"use client";

import { useEffect } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import getCategoryAttributes from "./utils/getCategoryAttributes";

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

  useEffect(() => {
    // Устанавливаем дефолтные значения для атрибутов

    getCategoryAttributes();

    attributes.forEach((attr) => {
      if (attr.values.length > 0) {
        setValue(`attributes[${attr.id}]`, attr.values[0].id);
      }
    });
  }, [attributes, setValue]);

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
      {attributes.map((attr) => (
        <div key={attr.id}>
          <label>{attr.name}</label>
          <Controller
            name={`attributes[${attr.id}]`}
            control={control}
            render={({ field }) => (
              <select {...field}>
                <option value="">Выберите значение</option>
                {attr.values.map((value) => (
                  <option key={value.id} value={value.id}>
                    {value.name}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
      ))}
      <pre>{JSON.stringify(attributes, null, 2)}</pre>
    </>
  );
}

// Пример использования компонента
const attributes = [
  {
    name: "первый атрибут",
    id: 1,
    values: [
      { id: 1, name: "первое значение атрибута" },
      { id: 2, name: "второе значение атрибута" },
    ],
  },
  {
    name: "второй атрибут",
    id: 2,
    values: [
      { id: 3, name: "первое значение атрибута" },
      { id: 4, name: "второе значение атрибута" },
    ],
  },
];
