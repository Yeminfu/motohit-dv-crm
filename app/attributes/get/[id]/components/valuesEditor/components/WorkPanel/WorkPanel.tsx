import ts_attributeValue from "#types/attributes/ts_attributeValue.ts";
import DeleteAttributeValue from "./components/deleteAttributeValue/deleteAttributeValue";

export default function WorkPanel(props: {
  attributeValue: ts_attributeValue;
}) {
  return (
    <>
      <DeleteAttributeValue attributeValue={props.attributeValue} />
    </>
  );
}
