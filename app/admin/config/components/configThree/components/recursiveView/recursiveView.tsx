"use client";

import { useState } from "react";
import ts_configWithChildren from "../../types/ts_configWithChildren";
import { toast } from "react-toastify";
import ClassesInConfig from "../classesInConfig/classesInConfig";
import BootstrapFolder from "#icons/bootstrap-folder.tsx";

export default function RecursiveView(props: {
  config: ts_configWithChildren;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="card">
      <div className="card-header">
        <div className="d-flex">
          <strong
            onClick={() => {
              toast("открываем конфигу");
            }}
          >
            <BootstrapFolder /> {props.config.id} {props.config.name}
          </strong>
          <div className="ms-2" onClick={() => setIsOpen(!isOpen)}>
            развернуть
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="card-body">
          {props.config.children.map((config) => (
            <RecursiveView config={config} key={config.id} />
          ))}
          <ClassesInConfig idConfig={props.config.id} />
        </div>
      )}
    </div>
  );
}
