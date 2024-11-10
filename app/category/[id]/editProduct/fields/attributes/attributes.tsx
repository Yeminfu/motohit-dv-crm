"use client";

import { useEffect, useState } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import getAttributesWithValues from "./utils/getAttributesWithValues";
import ts_AttributeWithValues from "@/types/attributes/ts_attributesWithValues";
import getProductAttributes from "./utils/getProductAttributes";
import ts_productAttributes from "#app/api/attributes/getProductAttributes/types/ts_productAttributes.js";
import ts_attributeWithValuesAndDefaultValue from "./types/ts_AttributeWithValues";

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
    ts_attributeWithValuesAndDefaultValue[]
  >([]);

  useEffect(() => {
    if (props.idCategory && props.idProduct) {
      (async () => {
        const attributeWithValuesAndDefaultValue =
          await getAttributesWithValues(props.idCategory, props.idProduct);
        setCategoryAttributes(attributeWithValuesAndDefaultValue);

        for (
          let index = 0;
          index < attributeWithValuesAndDefaultValue.length;
          index++
        ) {
          const attributeWithValue = attributeWithValuesAndDefaultValue[index];
          console.log("attributeWithValue#9f8s", {
            idAttribute: attributeWithValue.id,
            idAttributeValue: attributeWithValue.idDefaultAttributeValue,
          });
        }

        // setValue('attributes',)

        // console.log(
        //   "attributeWithValuesAndDefaultValue"
        //   // attributeWithValuesAndDefaultValue.map((a=>))
        // );
      })();
    }
  }, [props.idProduct, props.idCategory]);

  return (
    <>
      <div
        className="btn btn-dark"
        onClick={() => {
          console.log(JSON.stringify(getValues("attributes"), null, 2));
        }}
      >
        btn
      </div>

      {/* ******************************************** */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Атрибут</th>
            <th>Значение</th>
          </tr>
        </thead>
        <tbody>
          {categoryAttributes.map((categoryAttribute) => {
            return (
              <tr key={categoryAttribute.id}>
                <td>{categoryAttribute.attribute_name}</td>
                <td>
                  <select
                    {...register(`attribute`, { required: true })}
                    className="form-select"
                    autoComplete="off"
                  >
                    <option value="">Значение атрибута</option>
                    {categoryAttribute.values.map((value) => (
                      <option key={value.id} value={String(value.id)}>
                        {value.value_name}
                      </option>
                    ))}
                  </select>
                  {/* <pre>
                    {JSON.stringify(
                      categoryAttribute.idDefaultAttributeValue,
                      null,
                      2
                    )}
                  </pre>
                  <pre>{JSON.stringify(categoryAttribute.values, null, 2)}</pre> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <pre>
        {JSON.stringify(["categoryAttributes", categoryAttributes], null, 2)}
      </pre>
    </>
  );
}
