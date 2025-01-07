import ts_view4edit from "#app/admin/views/types/ts_view4edit.ts";

export default function ViewOutput(props: ts_view4edit) {
  return (
    <>
      <div className="card">
        <div className="card-header">Вывод данных для</div>
        <div className="card-body"></div>
      </div>
      ViewOutput #{props.id}
    </>
  );
}
