"use client";

import { useEffect, useState } from "react";

export default function Procedures(props: { idConfig: number }) {
  const [procedures, setProcedures] = useState<
    {
      name: string;
      title: string;
      id: number;
      SQLString: string;
    }[]
  >();
  useEffect(() => {
    fetch("/admin/api/procedures/getProceduresByIdConfig", {
      method: "post",
      body: JSON.stringify(props),
    })
      .then((x) => x.json())
      .then((x) => {
        if (x.procedures) {
          setProcedures(x.procedures);
        } else {
          alert(JSON.stringify(x, null, 2));
        }
      });
  }, []);
  return (
    <>
      client procedures {props.idConfig}
      {procedures && (
        <table className="table table-striped table-bordered">
          <thead
            style={{
              background: "#eee",
              position: "sticky" /* Делаем заголовки липкими */,
              top: 0 /* Устанавливаем верхнюю границу */,
              backgroundColor: "white" /* Фон заголовка */,
              zIndex: 1 /* Убедитесь, что заголовок выше других элементов */,
            }}
          >
            <tr>
              <th>id</th>
              <th>name</th>
              <th>title</th>
              <th>SQLString</th>
            </tr>
          </thead>
          <tbody>
            {procedures.map((procedure) => (
              <tr key={procedure.id}>
                <td>{procedure.id}</td>
                <td>{procedure.name}</td>
                <td>{procedure.title}</td>
                <td>
                  <pre>{procedure.SQLString}</pre>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
