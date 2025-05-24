"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function AppendUserForm(props: {
  idGroup: number
}) {
  const { register, handleSubmit, control } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  if (!isOpen) return <button onClick={() => setIsOpen(true)}>+</button>
  return (
    <>
      <form
        onSubmit={handleSubmit(async (x) => {
          await onSubmit(x);
        })}
      >

        {/* <input
          {...register("idGroup", { required: true })}
          placeholder=""
          className="form-control d-none"
          defaultValue={String(props.idGroup)}
          autoComplete="off"
        /> */}
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
  fetch("/admin/api/groups/append-user", {
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
