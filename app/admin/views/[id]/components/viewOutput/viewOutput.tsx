import ts_view4edit from "#app/admin/views/types/ts_view4edit.ts";
import ConsoleForm from "./components/consoleForm";

export default function ViewOutput(props: ts_view4edit) {
  const sql = `
    select
     *
    from ${props.name}
    limit 100
    order by id desc
  `;
  return (
    <>
      <div className="card">
        <div className="card-header">Вывод данных для</div>
        <div className="card-body"></div>
      </div>
      <ConsoleForm sql={sql} />
    </>
  );
}
