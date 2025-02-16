import { toast } from "react-toastify";

export default async function updateIndexNumber(
  idProduct: number,
  idNextProduct: number
) {
  console.log({ idProduct, idNextProduct });


  try {
    const response = await fetch("/api/products/update-index-number", {
      method: "post",
      body: JSON.stringify({ idProduct, idNextProduct })
    });


    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Полученные данные:', data);

  } catch (error) {
    toast.error('Ошибка #jsdf942');
    alert('Ошибка #jsdf942' + JSON.stringify(error, null, 2))
  }

}