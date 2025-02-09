import ts_attributeValue from "#types/attributes/ts_attributeValue.js";
import WorkPanel from "./components/WorkPanel/WorkPanel";

export default async function ValuesEditor(props: {
  attributeValues: ts_attributeValue[];
}) {
  return (
    <>
      <table className="table table-bordered w-auto mt-2">
        <thead>
          <tr>
            <th>id</th>
            <th>Значение</th>
          </tr>
        </thead>
        <tbody>
          {props.attributeValues.map((attributeValue) => (
            <tr key={attributeValue.id}>
              <td>{attributeValue.id}</td>
              <td>{attributeValue.value_name}</td>
              <td>
                <WorkPanel attributeValue={attributeValue} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
