import dbWorker from "#db/dbWorker.ts";
import AuthedLayout from "#utils/authedLayout.tsx";
import Link from "next/link";

export default async function Page() {
  const tables = await getDBTables();
  return (
    <>
      <AuthedLayout title="Панель администратора">
        <>
          <h3>Классы</h3>
          <table className="table table-bordered w-auto">
            <tbody>
              {tables.map((table) => (
                <tr key={table.Tables_in_motohit_dv_crm}>
                  <td>
                    <Link
                      className=""
                      href={`/admin/tables/${table.Tables_in_motohit_dv_crm}`}
                    >
                      {table.Tables_in_motohit_dv_crm}
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

async function getDBTables(): Promise<{ Tables_in_motohit_dv_crm: string }[]> {
  return dbWorker(`show tables`, []);
}
