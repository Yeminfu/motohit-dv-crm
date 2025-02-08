import ts_booleanField from "../types/ts_booleanField";

export default async function updateFieldValue(
  props: ts_booleanField
  // idAttribute: number, fieldName: string, value: boolean
) {

  fetch('/api/attributes/updateProductAttrivuteFieldValue', {
    method: "post",
    body: JSON.stringify(props)
  })
  // console.log('updateFieldValue', {
  //   idAttribute,
  //   value,
  //   fieldName
  // });
}

