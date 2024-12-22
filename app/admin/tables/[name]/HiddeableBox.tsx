"use client";
import { ReactElement, useState } from "react";

export default function HiddeableBox(props: { children: ReactElement }) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <button
        className="btn btn-outline-dark btn-sm text-nowrap"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "Скрыть" : "Показать"} элемент
      </button>
      {isVisible && <div>{props.children}</div>}
    </>
  );
}
