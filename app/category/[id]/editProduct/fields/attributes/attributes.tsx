"use client";

import { Fragment, useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import getAttributesWithValues from "./utils/getAttributesWithValues";
import ts_attributeWithValuesAndDefaultValue from "./types/ts_AttributeWithValues";

export default function Attributes(props: {
  idProduct: number;
  idCategory: number;
}) {
  const { register, control, setValue } = useFormContext();

  const [categoryAttributes, setCategoryAttributes] = useState<
    ts_attributeWithValuesAndDefaultValue[]
  >([]);

  const { fields: attributesFields, append: appendAttribute } = useFieldArray({
    control,
    name: "attributes",
  });

  useEffect(() => {
    setValue("attributes", []);
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

          appendAttribute({
            idAttribute: String(attributeWithValue.id),
            idAttributeValue: String(
              attributeWithValue.idDefaultAttributeValue
            ),
          });

          console.log("attributeWithValue#9f8s", {
            idAttribute: String(attributeWithValue.id),
            idAttributeValue: String(
              attributeWithValue.idDefaultAttributeValue
            ),
          });
        }
      })();
    }
  }, [props.idProduct, props.idCategory]);

  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Атрибут</th>
            <th>Значение</th>
          </tr>
        </thead>
        <tbody>
          {attributesFields.map(
            //@ts-ignore
            (
              field: {
                id: string;
                idAttribute: string;
                idAttributeValue: string;
              },
              index
            ) => {
              const matchWithCategoryAttributes = categoryAttributes.find(
                (CA) => String(CA.id) === field.idAttribute
              );
              if (!matchWithCategoryAttributes)
                return (
                  <tr key={index}>
                    <td>
                      Err #dma9332 {field.id} {field.idAttribute}
                    </td>
                  </tr>
                );
              return (
                <tr key={field.id}>
                  <td>
                    {matchWithCategoryAttributes.attribute_name} ID# атрибута{" "}
                    {matchWithCategoryAttributes.id}
                  </td>
                  <td>
                    <select
                      {...register(`attributes.${index}.idAttributeValue`, {
                        required: true,
                      })}
                      className="form-control"
                    >
                      <option value={""}>выберите значение</option>
                      <>
                        {matchWithCategoryAttributes.values.map(
                          (attributeValue) => (
                            <Fragment key={attributeValue.id}>
                              <option value={attributeValue.id}>
                                {attributeValue.value_name} ID# значения
                                атрибута {attributeValue.id}
                              </option>
                            </Fragment>
                          )
                        )}
                      </>
                    </select>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </>
  );
}
