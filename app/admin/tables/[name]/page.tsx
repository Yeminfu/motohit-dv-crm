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
            <tbody>
              {tables.map((table) => (
                <tr>
                  <td>
                    <Link
                      className=""
                      href={`/admin/tables/${table.COLUMN_NAME}`}
                    >
                      {table.COLUMN_NAME}
                    </Link>
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

async function getColumnsByTableName(
  tableName: string
): Promise<{ COLUMN_NAME: string }[]> {
  return dbWorker(
    `
      select
      COLUMN_NAME 	 
      from information_schema.columns
      where
        table_name = 'chbfs_attributes'
    `,
    []
  );
}
