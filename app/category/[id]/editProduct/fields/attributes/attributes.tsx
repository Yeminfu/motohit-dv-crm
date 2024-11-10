"use client";

import { useEffect, useState } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import getCategoryAttributes from "./utils/getCategoryAttributes";
import ts_AttributeWithValues from "@/types/attributes/ts_attributesWithValues";
import getProductAttributes from "./utils/getProductAttributes";
import ts_productAttributes from "#app/api/attributes/getProductAttributes/types/ts_productAttributes.js";

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

  const [productDefaultAttributes, setProductDefaultAttributes] = useState<
    ts_productAttributes[]
  >([]);

  useEffect(() => {
    // console.log("idProduct", props.idProduct);
    (async () => {
      const attributes = await getProductAttributes(props.idProduct);
      setValue(
        "attributes",
        attributes.map((a) => {
          console.log("a.idAttributeValue", a);
          return {
            idAttribute: a.idAttribute,
            idAttributeValue: a.idAttributeValue,
          };
        })
        // [
        //   { idAttribute: "1", idAttributeValue: "2" },
        //   { idAttribute: "3", idAttributeValue: "4" },
        // ]
      );
      // { idAttribute: "1", idAttributeValue: "2" },
      //   { idAttribute: "3", idAttributeValue: "4" }
      setProductDefaultAttributes(attributes);
    })();
  }, [props.idProduct]);

  useEffect(() => {
    (async () => {
      const attributes = await getCategoryAttributes(props.idCategory);
      setCategoryAttributes(attributes);
      console.log("attributes", attributes);
      // attributes.forEach((attr) => {
      //   if (attr.values.length > 0) {
      //     setValue(`attributes[${attr.id}]`, attr.values[0].id);
      //   }
      // });
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
      <pre>
        {JSON.stringify(
          ["productDefaultAttributes", productDefaultAttributes],
          null,
          2
        )}
      </pre>
      <div
        className="btn btn-dark"
        onClick={() => {
          console.log(JSON.stringify(getValues("attributes"), null, 2));
        }}
      >
        btn
      </div>
      <Controller
        name="attributes"
        control={control}
        render={({ field }) => {
          console.log("field", [field, field.value]);

          return (
            <div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>categoryAttribute.id</th>
                    <th>categoryAttribute.id</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryAttributes.map((categoryAttribute) => {
                    const match = productDefaultAttributes.find(
                      (P_A) => P_A.idAttribute === 0
                    );

                    return (
                      <tr key={categoryAttribute.id}>
                        <td>{categoryAttribute.id}</td>
                        <td>
                          value
                          <pre>
                            {JSON.stringify(
                              {
                                productDefaultAttributes,
                                "field.value": field.value,
                              },
                              null,
                              2
                            )}
                          </pre>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {/* {field.value
                // []
                //@ts-ignore
                .map((item, index) => {
                  // console.log({ item });
                  return (
                    <div key={index}>
                      <pre>{JSON.stringify({ item }, null, 2)}</pre>
                      <select
                        {...{
                          ...field,
                        }}
                      >
                        <option value="">Выберите значение</option>
                        <option value="attr_value_1">attr_value_1</option>
                        <option value="attr_value_2">attr_value_2</option>
                      </select>
                    </div>
                  );
                })} */}
              {/* <button
                type="button"
                onClick={() => field.onChange([...field.value, ""])}
              >
                Добавить элемент
              </button> */}
            </div>
          );
        }}
      />
      {/* {categoryAttributes.map((attr) => {
        console.log("attr", attr);

        return (
          <div key={attr.id}>
            <label>{attr.attribute_name}</label>
            <Controller
              name={`attributes[${attr.id}]`}
              control={control}
              render={({ field }) => (
                <select {...field}>
                  <option value="">Выберите значение</option>
                  {attr.values.map((value) => {
                    console.log("value", value);

                    return (
                      <option key={value.id} value={value.id}>
                        {value.value_name}
                      </option>
                    );
                  })}
                </select>
              )}
            />
          </div>
        );
      })} */}
      {/* <pre>{JSON.stringify(categoryAttributes, null, 2)}</pre> */}
    </>
  );
}
