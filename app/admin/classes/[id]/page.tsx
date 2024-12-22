import getColumnsByTableName from "#app/admin/utils/getColumnsByTableName.ts";
import AuthedLayout from "#utils/authedLayout.tsx";
import Link from "next/link";
import DBSelectClass from "./utils/DBSelectClass";
import HiddeableBox from "#app/admin/tables/[name]/HiddeableBox.tsx";
import CreateNewField from "./components/createNewField/createNewField";

export default async function Page(params: { params: { id: string } }) {
  const _class = await DBSelectClass(Number(params.params.id));

  if (!_class) return <>Ошибка #s9djakg</>;

  const columns = await getColumnsByTableName(_class.className);

  return (
    <AuthedLayout title={`Класс #${params.params.id}`}>
      <>
        <div className="card">
          <div className="card-header">Создать новую колонку</div>
          <div className="card-body">
            <CreateNewField className={_class.className} />
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <strong>Колонки</strong>
          </div>
          <div className="card-body">
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
                {columns.map((column) => (
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
          </div>
        </div>
      </>
    </AuthedLayout>
  );
}
