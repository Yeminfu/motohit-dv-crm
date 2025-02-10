import ts_fields from "../types/ts_fields";

export default async function onSubmit(values: ts_fields) {
  alert(JSON.stringify(values));
}