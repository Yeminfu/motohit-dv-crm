"use client"

import { toast } from "react-toastify";

export default function DeleteUserFromGroup(props: {
  idUser: number,
  idGroup: number
}) {
  return <>
    {/* {JSON.stringify({ props })} */}
    <button className="btn btn-sm btn-outline-danger"
      onClick={() => {
        onClick(props.idUser, props.idGroup)
      }}
    >удалить</button>
  </>
}

async function onClick(idUser: number, idGroup: number) {
  fetch("/admin/api/groups/remove-user", {
    method: "post",
    body: JSON.stringify({
      idGroup,
      idUser
    }),
  })
    .then((x) => x.json())
    .then((x) => {
      if (x.result) {
        toast.success('Пользователь удален из группы');
        setTimeout(() => {
          location.reload();
        }, 1000);
        return;
      }
      alert(JSON.stringify(x, null, 2))
    })
    .catch((err) => {
      toast.error("Плохая ошибка #sdf94");
    });
}