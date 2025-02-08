"use client";
import ts_attributeValue from "#types/attributes/ts_attributeValue.ts";
import { useState } from "react";

export default function ViewAttributeValues(props: {
  attributeValues: ts_attributeValue[];
}) {
  const [view, setView] = useState(false);
  const switchView = () => setView(!view);
  return (
    <>
      <button className="btn btn-outline-dark btn-sm" onClick={switchView}>
        {view ? "скрыть" : "показать"} значения
      </button>
      {view && (
        <table className="table mt-2">
          <tbody>
            {props.attributeValues.map((attributeValue) => (
              <tr key={attributeValue.id}>
                <td>{attributeValue.value_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
