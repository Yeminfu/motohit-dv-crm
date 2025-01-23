"use client";
import { toast } from "react-toastify";
import Form from "./components/form";

export default function UploadSQLDump() {
  return (
    <>
      <div>
        <button
          className="btn btn-sm btn-outline-dark"
          onClick={() => {
            toast("yo");
          }}
        >
          upload dump
        </button>
        <Form />
      </div>
    </>
  );
}
