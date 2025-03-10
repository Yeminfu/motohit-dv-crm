"use client";

import { useState } from "react";
import ts_configWithChildren from "../../types/ts_configWithChildren";
import { toast } from "react-toastify";
import ClassesInConfig from "../classesInConfig/classesInConfig";
import BootstrapFolder from "#icons/bootstrap-folder.tsx";
import Procedures from "./utils/procedures";
// import Procedures from "../procedures/procedures";

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
          <div className="card">
            <div className="card-header">
              <strong>Классы</strong>
            </div>
            <div className="card-body">
              <ClassesInConfig idConfig={props.config.id} />
            </div>
          </div>
          <div className="card">
            <div className="card-header mt-2">
              <strong>Процедуры</strong>
            </div>
            <div className="card-body">
              {/* <ClassesInConfig idConfig={props.config.id} /> */}
              <Procedures idConfig={props.config.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
