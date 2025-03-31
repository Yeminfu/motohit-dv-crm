"use client"

import { UserType } from "#types/users/userType.js";
import Modal from "@/utils/modal/modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPen } from 'react-icons/fa';
import fetchEditData from "./utils/fetchEditData";
import ts_editUserData from "./types/ts_editUserData";


export default function EditUser(props: { user: UserType }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) return <>
    <button onClick={() => {
      setIsOpen(true)
      // onClick(props.user.id)
    }} className="btn"><FaPen /></button>
  </>
  return isOpen && (
    <Modal
      isOpen={isOpen}
      title="Редактировать пользователя"
      closeFn={() => {
        setIsOpen(false);
      }}
    >
      <>
        <Form idUser={props.user.id} userData={{ is_active: String(props.user.is_active) }} />
      </>
    </Modal>
  )
}

function Form(props: { idUser: number, userData: ts_editUserData }) {
  const { register, handleSubmit } = useForm<ts_editUserData>({
    defaultValues: {
      is_active: String(Number(props.userData.is_active))
    },
  });
  return (
    <>
      <form
        onSubmit={handleSubmit(
          async (values) => {
            const res = await fetchEditData(props.idUser, values);
            console.log({ res });
            // onSubmit({ column, className: props.className })
          }
        )}
      >
        <table className="bable w-auto">
          <tbody>
            <tr>
              {/* <th>РАботает</th> */}
              <td>
                <div className="form-check">

                  <input
                    value="1"
                    {...register("is_active", { required: true })}
                    className="form-check-input" type="radio"
                    id="flexRadioDefault1"
                  />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Работает
                  </label>
                </div>
                <div className="form-check">
                  <input
                    value="0"
                    {...register("is_active", { required: true })}
                    className="form-check-input" type="radio"
                    id="flexRadioDefault2"
                  />
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Заблокирован
                  </label>
                </div>

              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-2">
          <button className="btn btn-dark btn-sm">Сохранить</button>
        </div>
      </form>
    </>
  );
}
