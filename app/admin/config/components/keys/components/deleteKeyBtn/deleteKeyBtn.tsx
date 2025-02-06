"use client";

import ts_key4delete from "#app/admin/config/types/ts_key4delete.js";
import ts_keyFromDB from "#app/admin/config/types/ts_keyFromDB.ts";

export default function DeleteKeyBtn(props: { keyObject: ts_keyFromDB }) {
  return (
    <>
      <div
        className="btn btn-outline-dark"
        onClick={() => {
          onClick({
            table: props.keyObject.tableName,
            column: props.keyObject.name,
          });
        }}
      >
        DeleteKeyBtn {JSON.stringify(props)}
      </div>
    </>
  );
}

async function onClick(props: ts_key4delete) {
  fetch("/admin/api/keys/delete-key", {
    method: "POST",
    body: JSON.stringify(props),
  });
}
