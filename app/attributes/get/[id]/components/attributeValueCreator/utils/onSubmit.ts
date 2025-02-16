import { toast } from "react-toastify";
import ts_inputs from "../types/ts_inputs";

export default async function onSubmit(data: ts_inputs) {
  fetch('/api/attributesValues/create', {
    method: 'POST',
    body: JSON.stringify(data)
  })
    .then(
      response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      }
    ).then(data => {
      if (!data.result) {
        alert(JSON.stringify(data, null, 2));
        return;
      }

      if (data.result.insertId) {
        toast.success("Значение атрибута создано");
        setTimeout(() => {
          location.reload()
        }, 500);
        return;
      }
      alert("Error #jsdfsd94");
    })
    .catch(error => {
      toast.error("Что-то пошло не так #8dj32m");
    });

}
