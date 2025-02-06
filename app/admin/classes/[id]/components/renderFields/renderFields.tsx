import HiddeableBox from "#app/admin/tables/[name]/HiddeableBox.tsx";
import ts_columnsFromSchema from "#app/admin/types/ts_columnsFromSchema.ts";
import Link from "next/link";
import DeleteField from "../deleteField/deleteField";

export default function RenderFields(props: {
  className: string;
  columns: ts_columnsFromSchema[];
}) {
  return (
    <>
      <table className="table table-bordered w-auto">
        <thead>
          <tr>
            <th>COLUMN_NAME</th>
            <th>DATA_TYPE</th>
            <th>CHARACTER_MAXIMUM_LENGTH</th>
            <th>IS_NULLABLE</th>
            <th>COLUMN_KEY</th>
            <th>COLUMN_DEFAULT</th>
          </tr>
        </thead>
        <tbody>
          {props.columns.map((column) => (
            <tr key={column.COLUMN_NAME}>
              <td>
                <Link className="" href={`/admin/tables/${column.COLUMN_NAME}`}>
                  {column.COLUMN_NAME}
                </Link>
              </td>
              <td>{column.DATA_TYPE}</td>
              <td>{column.CHARACTER_MAXIMUM_LENGTH}</td>
              <td>{column.IS_NULLABLE}</td>
              <td>{column.COLUMN_KEY}</td>
              <td>{column.COLUMN_DEFAULT}</td>
              <td>
                <div className="d-flex">
                  <HiddeableBox>
                    <pre>{JSON.stringify(column, null, 2)}</pre>
                  </HiddeableBox>
                  <DeleteField
                    className={props.className}
                    columnName={column.COLUMN_NAME}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
