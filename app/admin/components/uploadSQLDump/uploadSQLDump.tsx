"use client";
import { toast } from "react-toastify";
import Form from "./components/form";
import { useState } from "react";

export default function UploadSQLDump() {
  const [view, setView] = useState(false);
  return (
    <>
      <div>
        <button
          className="btn btn-sm btn-outline-dark"
          onClick={() => {
            setView(!view);
          }}
        >
          upload dump
        </button>
        <div>{view && <Form />}</div>
      </div>
    </>
  );
}
