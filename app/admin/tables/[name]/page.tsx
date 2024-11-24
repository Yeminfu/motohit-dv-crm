import dbWorker from "#db/dbWorker.ts";
import AuthedLayout from "#utils/authedLayout.tsx";
import Link from "next/link";

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
                  <td>
                    <pre>{JSON.stringify(column, null, 2)}</pre>
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

async function getColumnsByTableName(tableName: string): Promise<
  {
    COLUMN_NAME: string;
    DATA_TYPE: string;
    CHARACTER_MAXIMUM_LENGTH: number | null;
    IS_NULLABLE: "YES" | "NO";
    COLUMN_KEY: null | "PRI" | "MUL";
  }[]
> {
  /*
    COLUMN_NAME, 
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    IS_NULLABLE
  */
  return dbWorker(
    `
      select
        COLUMN_NAME, 
        DATA_TYPE,
        CHARACTER_MAXIMUM_LENGTH,
        IS_NULLABLE,
        COLUMN_KEY
      from information_schema.columns
      where
        table_name = ?
    `,
    [tableName]
  );
}
