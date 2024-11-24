import AuthedLayout from "#utils/authedLayout.tsx";
import Link from "next/link";
import getColumnsByTableName from "./getColumnsByTableName";
import HiddeableBox from "./HiddeableBox";

export default async function Page(props: { params: { name: string } }) {
  const tables = await getColumnsByTableName(props.params.name);
  return (
    <>
      <AuthedLayout title="Панель администратора">
        <>
          <h3>Колонки таблицы: {props.params.name}</h3>
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
              <thead></thead>
              {tables.map((column) => (
                <tr key={column.COLUMN_NAME}>
                  <td>
                    <Link
                      className=""
                      href={`/admin/tables/${column.COLUMN_NAME}`}
                    >
                      {column.COLUMN_NAME}
                    </Link>
                  </td>
                  <td>{column.DATA_TYPE}</td>
                  <td>{column.CHARACTER_MAXIMUM_LENGTH}</td>
                  <td>{column.IS_NULLABLE}</td>
                  <td>{column.COLUMN_KEY}</td>
                  <td>{column.COLUMN_DEFAULT}</td>
                  <td>
                    <HiddeableBox>
                      <pre>{JSON.stringify(column, null, 2)}</pre>
                    </HiddeableBox>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      </AuthedLayout>
    </>
  );
}
