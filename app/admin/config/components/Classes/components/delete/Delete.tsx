"use client";

import onClick from "./utils/onClick";

export default function Delete(props: { idClass: number }) {
  return (
    <button
      className="btn btn-sm btn-outline-dark"
      onClick={() => onClick(props.idClass)}
    >
      удалить
    </button>
  );
}
