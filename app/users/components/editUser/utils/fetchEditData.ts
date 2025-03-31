import { toast } from "react-toastify";
import ts_editUserData from "../types/ts_editUserData";

export default async function fetchEditData(idUser: number, userData: ts_editUserData) {
  // console.log({ data });
  try {
    const response = await fetch(`/api/users/edit/${idUser}`, {
      method: "post",
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      alert("Ошибка #fd94j");
      return;
    }

    const data = await response.json();
    if (data.result) {
      toast.success("Сохранено");
      setTimeout(() => {
        location.reload();
      }, 1000);
      return;
    }
    if (data.error) {
      alert(JSON.stringify(data, null, 2));
      return;
    }
    // console.log("data", data);
  } catch (error) {
    alert('Error #ksdf94')
  }
}