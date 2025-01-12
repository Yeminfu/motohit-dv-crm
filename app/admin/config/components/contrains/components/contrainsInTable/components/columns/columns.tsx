import getColumns from "./utils/getColumns";

export default async function Columns(props: {
  tableName: string;
  contrainName: string;
}) {
  const columns = await getColumns(props.tableName, props.contrainName);
  return (
    <>
      <ul>
        {columns.result?.map((column) => (
          <li key={column.COLUMN_NAME} title={JSON.stringify(column, null, 2)}>
            {column.COLUMN_NAME}
          </li>
        ))}
      </ul>
    </>
  );
}
