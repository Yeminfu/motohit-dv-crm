import ts_class4delete from "#app/admin/api/classes/delete/types/ts_class4delete.ts";
import { toast } from "react-toastify";

export default async function onClick(props: ts_class4delete) {
  const res = await fetch(`/admin/api/classes/delete/`, {
    method: "post",
    body: JSON.stringify(props),
  }).then((x) => x.json());

  if (res.result) {
    res.result.affectedRows === 1
      ? toast.success("Успешно удалили")
      : toast.error("Ошибка удаления");
  }

  if (res.error) {
    toast.error(res.error.code);
    return;
  }
}
