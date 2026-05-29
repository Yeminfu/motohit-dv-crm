"use client";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";

interface ts_inputs {
  productName: string;
}

export default function Filter(props: { searchParams: {
    productName?:string;
} }) {
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ts_inputs>({
    defaultValues: {
      productName: props.searchParams.productName,
    },
  });

  if (typeof window === "undefined") return null;

  const domain = window.location.origin;

  async function onSubmit(x: any) {
    const newpathname = pathname + (x.productName ? `?productName=${x.productName}` : "");
    window.location.href = domain + "/" + newpathname;
  }

  return (
    <>
      <div>
        <div className="shadow p-2">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex">
                <input
                  {...register("productName")}
                  placeholder="Наименование/код"
                  className="form-control w-auto"
                  autoComplete="off"
                />
                <button className="btn btn-dark ms-2 btn-sm">Фильтр</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
