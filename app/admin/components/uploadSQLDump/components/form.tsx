import { useForm } from "react-hook-form";

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
  console.log("values", values);

  // const res: any = await fetch("/admin/api/classes/create", {
  //   method: "post",
  //   body: JSON.stringify(values),
  // }).then((x) => x.json());

  // if (res.error) {
  //   toast.error(res.error.code);
  //   return;
  // }
}
