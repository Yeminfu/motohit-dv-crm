'use client'

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateGroupForm() {
  const { register, handleSubmit, control } = useForm();

  return (
    <>
      <h3>Создать группу</h3>
      <form
        onSubmit={handleSubmit(async (x) => {
          await onSubmit(x);
        })}
      >
        <div>
          <b>Имя</b>
        </div>
        <input
          {...register("name", { required: true })}
          placeholder=""
          className="form-control"
          autoComplete="off"
        />
        <button>go</button>
      </form>
    </>
  );
}

async function onSubmit(values: any) {
  const { name } = values;
  fetch("/admin/api/groups/create-group", {
    method: "post",
    body: JSON.stringify({
      name,
    }),
  })
    .then((x) => x.json())
    .then((x) => {
      alert(JSON.stringify(x, null, 2))
    })
    .catch((err) => {
      toast.error("Плохая ошибка #kdkadn5");
    });
}
