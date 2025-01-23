"use client";
import { toast } from "react-toastify";

export default function UploadSQLDump() {
  return (
    <>
      <button
        className="btn btn-sm btn-outline-dark"
        onClick={() => {
          toast("yo");
        }}
      >
        upload dump
      </button>
    </>
  );
}
