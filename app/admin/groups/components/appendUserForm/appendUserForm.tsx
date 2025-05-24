"use client"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AppendUserForm(props: {
  idGroup: number
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState<{ id: number, name: string }[]>([]);

  useEffect(() => {
    if (isOpen) {
      (async () => {
        setLoading(true)
        await fetch('/admin/api/users/get', {
          method: "post",
        })
          .then(x => x.json())
          .then(x => x.users)
          .then(setUsers)
        setLoading(false)
      })()
    }
  }, [isOpen])

  if (!isOpen) return <button className="btn btn-sm btn-outline-dark" onClick={() => setIsOpen(true)}>Добавить пользователя</button>

  if (loading) return <>Загрузка</>

  return <>
    <ul className="list-group">
      {users.map(x => <li key={x.id} className="list-group-item">
        <button
          className="btn btn-outline-dark btn-sm d-block w-auto"
          onClick={async () => {
            setLoading(true);
            await appendUser(props.idGroup, x.id);
            setLoading(false)
          }}
        >
          {x.name} ({x.id})
        </button>
      </li>)}
    </ul>
    <pre>{JSON.stringify(users, null, 2)}</pre>
  </>
}

async function appendUser(idGroup: number, idUser: number) {
  console.log({
    idGroup,
    idUser
  });

  // const { idUser } = values;
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
