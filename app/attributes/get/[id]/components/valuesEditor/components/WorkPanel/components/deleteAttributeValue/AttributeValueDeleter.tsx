"use client";

import ts_attributeValue from "#types/attributes/ts_attributeValue.ts";
import { useState } from "react";

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
        {/* <pre>{JSON.stringiefy(props.attributeValue)}</pre> */}
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
        {/* <pre>{JSON.stringify(props.atteributeValue)}</pre> */}
      </>
    );
  // return <>ts_attributeValue</>;
}

async function deleteAttributeValue(idAttribute: number) {
  console.log({ idAttribute });
  try {
    const response = await fetch(
      `/api/attributesValues/dropValue/` + idAttribute,
      {
        method: "post",
        // body: JSON.stringify({ idAttribute }),
      }
    );
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const data = await response.json();
    console.log("data", data);

    if (data.error) {
      alert("Ошибка: #d9dk3h: " + data.error?.code);
      return;
    }

    if (data.result) {
      // toast.success("Колонка сохранена");
      return;
    }
  } catch (error: any) {
    alert("err #d9sj3nb");
  }
}
