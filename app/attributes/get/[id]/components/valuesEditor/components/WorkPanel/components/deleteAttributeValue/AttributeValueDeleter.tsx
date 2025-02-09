"use client";

import ts_attributeValue from "#types/attributes/ts_attributeValue.ts";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AttributeValueDeleter(props: {
  attributeValue: ts_attributeValue;
}) {
  const ATTENTION_TEXT = "attention";

  const [state, setState] = useState<undefined | string>();

  if (!state)
    return (
      <>
        <button
          onClick={() => {
            setState(ATTENTION_TEXT);
          }}
          className="btn btn-sm btn-danger"
        >
          удалить свойство
        </button>
      </>
    );

  if (state === ATTENTION_TEXT)
    return (
      <>
        <div>подтвердите удаление свойства (необратимо)</div>
        <button
          onClick={() => {
            deleteAttributeValue(props.attributeValue.id);
          }}
          className="btn btn-sm btn-danger"
        >
          удалить
        </button>
      </>
    );
}

async function deleteAttributeValue(idAttribute: number) {
  console.log({ idAttribute });
  try {
    const response = await fetch(
      `/api/attributesValues/dropValue/` + idAttribute,
      { method: "post" }
    );
    if (!response.ok) {
      alert(JSON.stringify(response, null, 2));
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const data = await response.json();
    console.log("data", data);

    if (data.error) {
      alert("Ошибка: #d9dkjk3h: " + JSON.stringify(data, null, 2));
      return;
    }

    if (data[0].affectedRows) {
      toast("Значение атрибута изменено");
      setTimeout(() => {
        location.reload();
      }, 1000);
    } else {
      alert(
        JSON.stringify({
          error: "error #kfsdf94",
          data,
        })
      );
    }
  } catch (error: any) {
    alert("err #d9sj3nb");
  }
}
