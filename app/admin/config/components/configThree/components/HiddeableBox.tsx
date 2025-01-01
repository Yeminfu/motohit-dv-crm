"use client";
import { ReactElement, useState } from "react";
import { toast } from "react-toastify";

export default function HiddeableBox(props: {
  children: ReactElement;
  isRoot: boolean;
}) {
  const [isVisible, setIsVisible] = useState(props.isRoot || false);
  return (
    <>
      {isVisible && (
        <div>
          {props.children}{" "}
          <div
            className="btn btn-sm btn-outline-dark"
            onClick={() => {
              if (props.isRoot) return;
              setIsVisible(!isVisible);
              toast("toast");
            }}
          >
            ↓
          </div>
        </div>
      )}
    </>
  );
}
