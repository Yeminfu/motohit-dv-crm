"use client";

import ts_class4delete from "#app/admin/api/classes/delete/types/ts_class4delete.ts";
import onClick from "./utils/onClick";

export default function Delete(props: ts_class4delete) {
  return (
    <button
      className="btn btn-sm btn-outline-dark"
      onClick={() => onClick(props)}
    >
      удалить
    </button>
  );
}
