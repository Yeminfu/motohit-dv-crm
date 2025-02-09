import ts_attributeValue from "#types/attributes/ts_attributeValue.ts";
import AttributeValueDeleter from "./components/deleteAttributeValue/AttributeValueDeleter";

export default function WorkPanel(props: {
  attributeValue: ts_attributeValue;
}) {
  return (
    <>
      <AttributeValueDeleter attributeValue={props.attributeValue} />
    </>
  );
}
