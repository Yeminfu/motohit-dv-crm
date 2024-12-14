"use client";

import { useState } from "react";

export default function CreateClassButton() {
  const [isOpen, setOpen] = useState(false);
  if (!isOpen)
    return (
      <>
        <button
          onClick={() => {
            setOpen(true);
            // const _class = {
            //   id: 1,
            //   className: `chbfs_products`,
            // };
            // fetch("/admin/api/classes/create", {
            //   method: "post",
            //   body: JSON.stringify(_class),
            // })
            //   .then((x) => x.json())
            //   .then(console.log);
          }}
          className="btn btn-outline-dark"
        >
          createClassButton
        </button>
      </>
    );
  return <>form</>;
}
