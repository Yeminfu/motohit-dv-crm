import { toast } from "react-toastify";


export default async function appendUserFn(idGroup: number, idUser: number) {
  fetch("/admin/api/groups/append-user", {
    method: "post",
    body: JSON.stringify({
      idGroup,
      idUser
    }),
  })
    .then((x) => x.json())
    .then((x) => {
      if (x.result) {
        toast.success('Пользователь добавлен в группу');
        setTimeout(() => {
          location.reload();
        }, 1000);
        return;
      }
      alert(JSON.stringify(x, null, 2))
    })
    .catch((err) => {
      toast.error("Плохая ошибка #kdkadn5");
    });
}
