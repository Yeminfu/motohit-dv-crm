"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export function EditIsActive(props: {
  idProduct: number
  isArchived: boolean
}) {

  const [state, setState] = useState(String(props.isArchived))

  const { register, handleSubmit } = useForm({
    defaultValues: {
      isArchived: state
    }
  });

  const handleChange = async () => {
    try {
      const response = await fetch(
        "/products/dublicates/utils/apiSwitchIsArchived",
        {
          method: "post",
          body: JSON.stringify({
            idProduct: props.idProduct
          })
        }
      )
      const data = await response.json();

      const newValue = data.result.pop().pop().isArchived;

      if (String(state) !== String(newValue)) {
        toast.success('Поменяли');
        setState(String(newValue));
        return;
      }
    } catch (error) {
      alert('error #ksdf94');
      return;
    }

    alert('error #ksdf94');

  };


  return <>
    <form
    >
      <div className="d-flex flex-nowrap text-nowrap">
        <label className="ms-2">
          <input type="radio" value="1" {...register("isArchived", {
            onChange: () => {
              handleChange();

            }
          })} />
          Да
        </label>
        <label className="ms-2">
          <input type="radio" value="0" {...register("isArchived")} />
          Нет
        </label>
      </div>
    </form>
  </>
}