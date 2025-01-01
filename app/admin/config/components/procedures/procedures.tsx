import Link from "next/link";
import Create from "./components/create/create";
import DBSelectProcedures from "./utils/DBSelectProcedures";
import dayjs from "dayjs";

export default async function Procedures() {
  const procedures = await DBSelectProcedures();
  if (!procedures) return "Ошибка #osdf84j";

  return (
    <>
      <Create />
      <table className="table table-bordered table-striped">
        <tbody>
          {procedures.map((procedure: any) => (
            <tr key={procedure.id}>
              <td>
                <Link href={`/admin/procedures/${procedure.id}`}>
                  {procedure.Name}
                </Link>
              </td>
              <td>{dayjs(procedure.Created).format("DD-MM-YYYY")}</td>
              <td>{procedure.Comment}</td>
              <td>{procedure.SQLString}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <pre>{JSON.stringify(procedures, null, 2)}</pre>
    </>
  );
}
