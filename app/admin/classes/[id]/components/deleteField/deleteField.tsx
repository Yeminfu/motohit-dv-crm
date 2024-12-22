"use client";

import ts_column4delete from "#app/admin/classes/types/ts_column4delete.js";
import dbWorker from "#db/dbWorker2.js";
import { toast } from "react-toastify";

export default function DeleteField(props: ts_column4delete) {
  return (
    <>
      <button
        onClick={() => {
          onClick(props);
        }}
        className="btn btn-outline-dark"
      >
        Удалить
      </button>
    </>
  );
}

async function onClick(props: ts_column4delete) {
  try {
    const response = await fetch("/admin/api/classes/fields/delete", {
      method: "post",
      body: JSON.stringify(props),
    });

    if (!response.ok) {
      alert("Ошибка #djfsd984");
      return;
    }

    const data = await response.json();
    if (data.result) {
      toast.success("Удалили колонку");
      return;
    }
    if (data.error) {
      alert(data.error?.code);
      return;
    }
    console.log("data", data);
  } catch (error) {}
}
