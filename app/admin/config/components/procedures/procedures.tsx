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
          {procedures.map((procedure) => (
            <tr key={procedure.Name} title={JSON.stringify(procedure, null, 2)}>
              <td>
                <Link href={`/admin/procedures/${procedure.Name}`}>
                  {procedure.Name}
                </Link>
              </td>
              <td>{dayjs(procedure.Created).format("DD-MM-YYYY")}</td>
              <td>{procedure.Comment}</td>
              <td>
                <pre>{procedure["Create Procedure"]}</pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
