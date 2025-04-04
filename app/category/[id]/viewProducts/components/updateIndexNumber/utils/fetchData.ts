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
    // console.log('Полученные данные:', );
    console.log(JSON.stringify(data, null, 2));

    console.log('data', data);

    if (data.result) {
      location.reload()
    } else {
      alert(JSON.stringify(data, null, 2))
    }

  } catch (error) {
    toast.error('Ошибка #jsdf942');
    alert('Ошибка #jsdf942' + JSON.stringify(error, null, 2))
  }

}