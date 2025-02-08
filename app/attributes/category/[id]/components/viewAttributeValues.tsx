"use client";
import ts_attributeValue from "#types/attributes/ts_attributeValue.ts";

export default function ViewAttributeValues(props: {
  attributeValues: ts_attributeValue[];
}) {
  return (
    <>
      <table className="table">
        <tbody>
          {props.attributeValues.map((attributeValue) => (
            <tr key={attributeValue.id}>
              <td>{attributeValue.value_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
