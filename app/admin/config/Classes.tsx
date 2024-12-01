import Link from "next/link";
import getDBTables from "./getDBTables";

export default async function Classes() {
  const tables = await getDBTables();
  return (
    <table className="table table-bordered w-auto">
      <thead>
        <tr>
          <th>LINK</th>
          {Object.keys(tables[0]).map((key) => (
            <th>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tables.map((table) => {
          return (
            <tr key={table.Tables_in_motohit_dv_crm}>
              <td>
                <Link
                  className=""
                  href={`/admin/tables/${table.Tables_in_motohit_dv_crm}`}
                >
                  {table.Tables_in_motohit_dv_crm}
                </Link>
              </td>
              {/* {Object.values(keys[0]).map((key) => (
            <td>{key}</td>
          ))} */}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
