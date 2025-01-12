"use client";

export default function DownloadSQLDump() {
  return (
    <>
      <button
        onClick={() => {
          getDump();
        }}
        className="btn btn-outline-dark"
      >
        getDump
      </button>
    </>
  );
}

async function getDump() {
  await fetch("/admin/api/get-dump", { method: "post" });
}
