import ts_attributeValue from "#types/attributes/ts_attributeValue.js";

export default async function ValuesEditor(props: {
  attributeValues: ts_attributeValue[];
}) {
  return (
    <>
      <table className="table table-bordered w-auto mt-2">
        <thead>
          <tr>
            <th>id</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.attributeValues.map((attributeValue) => (
            <tr key={attributeValue.id}>
              <td>{attributeValue.id}</td>
              {/* <td>{attributeValue.idAttribute}</td> */}
              <td>{attributeValue.value_name}</td>
              <td>
                <WorkPanel></WorkPanel>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function WorkPanel() {
  return <>WorkPanel</>;
}
