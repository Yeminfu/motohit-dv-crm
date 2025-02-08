import ts_booleanField from "../types/ts_booleanField";

export default async function onSubmit(idAttribute: number, value: boolean) {
  console.log('onSubmit', {
    idAttribute,
    value
  });
}