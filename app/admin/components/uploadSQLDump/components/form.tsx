import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Form() {
  const { register, handleSubmit } = useForm<any>({
    defaultValues: {
      // "name": props.searchParams.name,
    },
  });
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="file"
          id="file"
          {...register("file", { required: "Файл обязателен" })}
        />
        <div className="mt-2">
          <button className="btn btn-dark btn-sm">Сохранить</button>
        </div>
      </form>
    </>
  );
}

async function onSubmit(values: any) {
  const formData = new FormData();
  formData.append("file", values.file[0]); // Добавляем файл в FormData

  try {
    const response = await fetch("/admin/api/uploadDump", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Ошибка при загрузке файла");
    }

    const result = await response.json();
    console.log(result);

    if (result.success) {
      toast.success("Дамп загружен");
    } else {
      alert("Ошибка #jdf94jldl");
    }
  } catch (error) {
    alert("Ошибка: #kfsdkf0\n" + JSON.stringify(error, null, 2));
  }
}
