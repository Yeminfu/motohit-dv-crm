import { ResultSetHeader } from "mysql2";
import { toast } from "react-toastify";

export default async function onClick(idClass: number) {
  //@ts-ignore
  const res: ResultSetHeader = await fetch(
    `/admin/api/classes/delete/` + idClass,
    {
      method: "post",
      body: JSON.stringify({ idClass }),
    }
  ).then((x) => x.json());

  res.affectedRows === 1
    ? toast.success("Успешно удалили")
    : toast.error("Ошибка удаления");
}
