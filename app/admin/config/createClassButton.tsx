"use client";

export default function CreateClassButton() {
  return (
    <>
      <button
        onClick={() => {
          const _class = {
            id: 1,
            className: `chbfs_products`,
          };
          fetch("/admin/api/classes/create", {
            method: "post",
            body: JSON.stringify(_class),
          })
            .then((x) => x.json())
            .then(console.log);
        }}
        className="btn btn-outline-dark"
      >
        createClassButton
      </button>
    </>
  );
}
