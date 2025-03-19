"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function EditProcedureForm(props: {
  name: string, body: string
}) {
  const { register, handleSubmit } = useForm<{ name: string, body: string }>({
    defaultValues: {
      name: props.name,
      body: props.body,
    },
  });
  const [open, setOpen] = useState(false)
  return <>
    <form
      onSubmit={handleSubmit((values) =>
        onSubmit(values)
      )}
    >
      <input
        {...register("name", { required: true })}
        className="form-control w-auto d-none"
        autoComplete="off"
      />
      <textarea
        {...register("body", { required: true })}
        className="form-control"
        style={{
          width: 1000,
          minHeight: 300
        }}
        autoComplete="off"
      />

      <div className="mt-2">
        <button className="btn btn-dark btn-sm">Сохранить</button>
      </div>
    </form>

  </>

}


async function onSubmit(values: { name: string, body: string }) {
  try {
    const response = await fetch(`/admin/api/procedures2_0/edit`, {
      method: "post",
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const data = await response.json();
    console.log("data", data);

    if (data.error) {
      alert("Ошибка: #fksdf84: " + data.error?.code);
      return;
    }

    if (data.result) {
      toast.success("ПРоцедура изменена");
      return;
    }
  } catch (error: any) {
    alert("err #sdkfs94");
  }
}
