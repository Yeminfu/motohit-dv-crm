"use client";

import { useEffect, useState } from "react";

export default function Procedures(props: { idConfig: number }) {
  const [procedures, setProcedures] = useState();
  useEffect(() => {
    fetch("/admin/api/procedures/getProceduresByIdConfig", {
      method: "post",
      body: JSON.stringify(props),
    })
      .then((x) => x.text())
      //@ts-ignore
      .then((x) => {
        console.log("xxxxxxxx", x);

        const dataFromJSON = JSON.parse(x.replace(/\\n/gim, "\n"));
        if (dataFromJSON.procedures) {
          setProcedures(dataFromJSON.procedures);
        } else {
          alert(JSON.stringify(x, null, 2));
        }
      });
  }, []);
  return (
    <>
      client procedures {props.idConfig}
      <pre>{JSON.stringify(procedures, null, 2)}</pre>
    </>
  );
}
