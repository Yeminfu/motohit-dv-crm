"use client";

import ViewSQLResult from "#app/admin/components/sqlConsole/components/viewSQLResult/viewSQLResult.jsx";
// import onSubmit from "#app/products/create/form/onSubmit.js";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ConsoleForm(props: { sql: string }) {
  const { register, handleSubmit } = useForm<{ sql: string }>({
    defaultValues: {
      sql: props.sql,
    },
  });
  const [state, setState] = useState<{ result: any | undefined }>();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <form
        onSubmit={handleSubmit(async (values) => {
          setLoading(true);
          const res = await onSubmit(values);
          setState(res);
          setLoading(false);
        })}
      >
        <>
          <textarea
            rows={10}
            {...register("sql", { required: true })}
            className="form-control "
            autoComplete="off"
          />
          <div className="mt-2">
            <button className="btn btn-dark btn-sm">Go</button>
          </div>
        </>
      </form>

      <div className="mt-2">
        <div className="shadow p-2">
          {(() => {
            if (loading) return <>Загрузка</>;

            if (!state) return <>введите запрос</>;
            if (!state.result?.length)
              return (
                <>
                  <strong>err #kfsыоыdf8</strong>
                  <pre>{JSON.stringify(state, null, 2)}</pre>
                </>
              );

            if (state.result)
              return (
                <>
                  <ViewSQLResult SQLResult={state.result} />
                </>
              );
            return (
              <pre>{JSON.stringify({ err: "#kdsa83", state }, null, 2)}</pre>
            );
          })()}
        </div>
      </div>
    </>
  );
}

async function onSubmit(values: { sql: string }) {
  try {
    const response = await fetch(`/admin/api/sql`, {
      method: "post",
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const data = await response.json();
    console.log("data", data);

    return data;
  } catch (error: any) {
    alert("err #kds83m");
  }
}
