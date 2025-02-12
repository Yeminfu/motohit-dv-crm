import ts_dbWorkerOutput from "@/db/types/ts_dbWorkerOutput";
import dbWorker from "@/db/dbWorker2";
import { toast } from "react-toastify";

export default async function onSubmit(attributeName: string, idCategory: number) {

  try {
    const url = `/api/attributes/create`;
    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify({
        attributeName,
        idCategory
      })
    });

    // Проверяем, успешен ли запрос
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
    }

    const data: ts_dbWorkerOutput = await response.json();

    if (!data.result) {
      alert(JSON.stringify(data, null, 2))
      return
    }
    toast.success('Успех!');
    setTimeout(() => {
      location.reload();
    }, (1000));
  } catch (error: any) {
    alert(JSON.stringify(['#fsdf94', error]))
    console.error('Произошла ошибка при выполнении запроса:', error.message);
  }
}

