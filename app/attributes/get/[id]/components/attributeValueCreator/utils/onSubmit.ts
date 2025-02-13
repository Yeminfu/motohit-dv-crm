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
          return response.json()
        } else {
          throw new Error(response.statusText);
        }
      }
    ).then(data => {
      if (data.success) {
        toast.success("Значение атрибута создано");
      } else {
        toast.error("Что-то пошло не так #dls84hs " + data.error);
      }
    })
    .catch(error => {
      toast.error("Что-то пошло не так #8dj32m");
    });

}
