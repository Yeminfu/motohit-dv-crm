"use client";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";

interface ts_inputs {
  productName: string;
  limit: string;
}

export default function Filter(props: { searchParams: {
    productName?:string;
    limit: string
} }) {
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
  } = useForm<ts_inputs>({
    defaultValues: {
      productName: props.searchParams.productName,
      limit: props.searchParams.limit,
    },
  });

  if (typeof window === "undefined") return null;

  const domain = window.location.origin;

  async function onSubmit(x: any) {
    let newPath = pathname + '?';

    const queryParams = [];
    
    if(x.productName){
      queryParams.push(`productName=${x.productName}`);
    };
    if(x.limit){
      queryParams.push(`limit=${x.limit}`);
    };
    const qs = queryParams.join('&');
    newPath += qs;
    window.location.href = domain + "/" + newPath;
  }

  return (
    <>
      <div>
        <div className="shadow p-2">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex">
                <div>
                  <span>Товар</span>
                  <input
                    {...register("productName")}
                    placeholder="Наименование/код"
                    className="form-control w-auto"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <span>К-во записей</span>
                  <input
                    {...register("limit")}
                    placeholder="К-во записей"
                    className="form-control w-auto"
                    autoComplete="off"
                  />
                </div>
                <button className="btn btn-dark ms-2 btn-sm">Фильтр</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
