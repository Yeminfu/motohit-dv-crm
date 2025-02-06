import getColumns from "./utils/getColumns";

export default async function Columns(props: {
  tableName: string;
  contrainName: string;
}) {
  const columns = await getColumns(props.tableName, props.contrainName);
  return (
    <>
      Колонки:
      <ul className="list-group">
        {columns.result?.map((column) => (
          <li
            className="list-group-item"
            key={column.COLUMN_NAME}
            title={JSON.stringify(column, null, 2)}
          >
            COLUMN_NAME: <strong> {column.COLUMN_NAME}</strong>
          </li>
        ))}
      </ul>
    </>
  );
}
