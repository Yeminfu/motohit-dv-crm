"use client";

import { ShopFromDB } from "@/types/shops/shopFromDBType";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateUserForm(props: { shops: ShopFromDB[] }) {
  const { register, handleSubmit, control } = useForm();
  return (
    <>
      <h3>Создать пользователя</h3>
      <form
        onSubmit={handleSubmit(async (x) => {
          await onSubmit(x);
        })}
      >
        <div className="row">
          <div className="col">
            <div className="mb-2">
              <div>
                <b>Имя</b>
              </div>
              <input
                {...register("name", { required: true })}
                placeholder=""
                className="form-control"
                autoComplete="off"
              />
            </div>
            <div className="mb-2">
              <div>
                <b>Телеграм (без @!)</b>
              </div>
              <input
                {...register("telegram_username", { required: true })}
                placeholder=""
                className="form-control"
                autoComplete="off"
              />
            </div>
            <div>
              <button className="btn btn-primary">Сохранить</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

async function onSubmit(values: any) {
  const { name, telegram_username } = values;
  if (/@/.test(telegram_username)) {
    toast.error('Ошибка! В телеграме не должно быть "@"');
    return;
  }
  fetch("api/users/create", {
    method: "post",
    body: JSON.stringify({
      name,
      telegram_username,
    }),
  })
    .then((x) => x.json())
    .then((x) => {
      if (x.success) {
        toast.success("Пользователь успешно создан!");
      } else {
        toast.error("Ошибка " + x.error);
      }
    })
    .catch((err) => {
      toast.error("Плохая ошибка #fjfn5");
    });
}
