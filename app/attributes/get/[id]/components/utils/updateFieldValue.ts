import ts_booleanField from "../types/ts_booleanField";

export default async function updateFieldValue(props: ts_booleanField) {
  try {
    const response = await fetch('/api/attributes/updateProductAttrivuteFieldValue', {
      method: "post",
      body: JSON.stringify(props)
    });
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("error #ksdff94", error);
    return null;
  }
}
