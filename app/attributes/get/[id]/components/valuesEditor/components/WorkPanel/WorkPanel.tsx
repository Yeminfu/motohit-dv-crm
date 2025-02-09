"use client";

import ts_attributeValue from "#types/attributes/ts_attributeValue.ts";
import { useState } from "react";

export default function WorkPanel(props: {
  attributeValue: ts_attributeValue;
}) {
  const [state, setState] = useState<undefined | string>();
  const ATTENTION_TEXT = "attention";
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
        <pre>{JSON.stringify(props.attributeValue)}</pre>
      </>
    );

  if (state === ATTENTION_TEXT)
    return (
      <>
        <div>подтвердите удаление свойства (необратимо)</div>
        <pre>{JSON.stringify(props.attributeValue)}</pre>
      </>
    );
}
