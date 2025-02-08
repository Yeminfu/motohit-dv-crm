export default function AttributeFieldEditor(props: {
  idAttribute: number;
  attributeInitValue: number;
}) {
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
}
