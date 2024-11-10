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

  const [productDefaultAttributes, setProductDefaultAttributes] = useState<
    ts_productAttributes[]
  >([]);

  useEffect(() => {
    if (props.idCategory && props.idProduct) {
      (async () => {
        const attributeWithValuesAndDefaultValue =
          await getAttributesWithValues(props.idCategory, props.idProduct);
        setCategoryAttributes(attributeWithValuesAndDefaultValue);
      })();
    }
    // alert(1);
    // console.log("idProduct", props.idProduct);
    // (async () => {
    //   const attributes = await getProductAttributes(props.idProduct);
    //   setValue(
    //     "attributes",
    //     attributes.map((a) => {
    //       console.log("a.idAttributeValue", a);
    //       return {
    //         idAttribute: a.idAttribute,
    //         idAttributeValue: a.idAttributeValue,
    //       };
    //     })
    //     // [
    //     //   { idAttribute: "1", idAttributeValue: "2" },
    //     //   { idAttribute: "3", idAttributeValue: "4" },
    //     // ]
    //   );
    //   // { idAttribute: "1", idAttributeValue: "2" },
    //   //   { idAttribute: "3", idAttributeValue: "4" }
    //   setProductDefaultAttributes(attributes);
    // })();
  }, [props.idProduct, props.idCategory]);

  // useEffect(() => {
  //   (async () => {
  //     const attributes = await getCategoryAttributes(props.idCategory);
  //     setCategoryAttributes(attributes);
  //     console.log("attributes", attributes);
  //     // attributes.forEach((attr) => {
  //     //   if (attr.values.length > 0) {
  //     //     setValue(`attributes[${attr.id}]`, attr.values[0].id);
  //     //   }
  //     // });
  //   })();
  // }, [props.idCategory]);

  // const onSubmit = (data: any) => {
  //   console.log(data);
  //   // Получаем значения поля attributes
  //   const attributeValues = getValues("attributes");
  //   console.log("Значения атрибутов:", attributeValues);
  // };

  return (
    <>
      <pre>
        {JSON.stringify(["categoryAttributes", categoryAttributes], null, 2)}
      </pre>
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
            <th>categoryAttribute.id</th>
            <th>categoryAttribute.id</th>
          </tr>
        </thead>
        <tbody>
          {categoryAttributes.map((categoryAttribute) => {
            const match = productDefaultAttributes.find(
              (P_A) => P_A.idAttribute === categoryAttribute.id
            );
            /**
             * если id атрибута из категории совпадает с каким-то атрибутом из дефолтных значений товара
             * он назначается дефолтным
             *
             */
            console.log("matchmatch", match);

            return (
              <tr key={categoryAttribute.id}>
                <td>
                  {categoryAttribute.attribute_name} (id: {categoryAttribute.id}
                  )
                </td>
                <td>
                  {/* value */}
                  <select
                    //  {...(() => {
                    //   return register(
                    //     //@ts-ignore
                    //     `retail_price[${index}].idPriceType`,
                    //     {
                    //       required: true,
                    //     }
                    //   );
                    // })()}
                    value={String(match?.idAttributeValue || "")}
                    onChange={(e) => {
                      console.log("eee", e.target.value);
                    }}
                  >
                    <option value="">Выберите значение</option>
                    {categoryAttribute.values.map((C_A_value) => {
                      console.log("C_A_value", C_A_value.id);

                      return (
                        <>
                          <option value={String(C_A_value.id)}>
                            {C_A_value.value_name} (id: {C_A_value.id})
                          </option>
                        </>
                      );
                    })}
                    {/* {attr.values.map((value) => {
                      console.log("value", value);

                      return (
                        <option key={value.id} value={value.id}>
                          {value.value_name}
                        </option>
                      );
                    })} */}
                  </select>
                  {/* <pre>
                    {JSON.stringify(
                      {
                        productDefaultAttributes,
                        "field.value": field.value,
                      },
                      null,
                      2
                    )}
                  </pre> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* ******************************************** */}
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

function handleChangeCategory(idCategory: number) {
  console.log();
}

function handleChangeAttributeValue(
  idAttribute: number,
  idAttributeNEWValue: number
) {}
