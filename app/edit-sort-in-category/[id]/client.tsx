"use client"
import { useFieldArray, useForm } from "react-hook-form";
import ts_product from "./ts_product";
import { useState } from "react";

export default function Client(props: {
  products: ts_product[]
}) {

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, getValues, control, setValue } = useForm<{
    products: ts_product[]
  }>(
    {
      defaultValues: {
        products: props.products
      }
    }
  );

  const { fields: productsFields, } = useFieldArray({
    control,
    name: "products",
    keyName: 'fuckoff'
  });

  async function onSubmit(values: { products: ts_product[] }) {
    setLoading(true);
    await fetch(
      '/api/products/update-index-number',
      {
        method: "post",
        body: JSON.stringify(values.products)
      });
    setLoading(false);
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }
    window.location.reload();
  }

  return <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <table className="table table-bordered w-auto">
        <thead>
          <tr>
            <th>Товар</th>
            <th>Порядковый номер</th>
          </tr>
        </thead>
        <tbody>
          {productsFields.map((product, index) => <tr key={index}>
            <td>{product.name}</td>
            <td>
              <input
                {...register(
                  `products.${index}.indexNumber`,
                  { required: true }
                )}
                className="form-control"
                autoComplete="off"
              />
            </td>
          </tr>)}
        </tbody>
      </table>
      {(() => {
        if (loading) return <>Загрузка</>
        return <button className="btn btn-sm btn-outline-dark">Сохранить</button>
      })()}
    </form>
  </>
}

