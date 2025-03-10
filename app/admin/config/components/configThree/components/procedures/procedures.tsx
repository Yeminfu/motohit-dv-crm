import Link from "next/link";
import Create from "./components/create/create";
import DBSelectProcedures from "./utils/DBSelectProcedures";
import dayjs from "dayjs";

export default async function Procedures(props: { idConfig: number }) {
  // if (1) return null;
  // return <>manamana</>;
  const procedures = await DBSelectProcedures(props.idConfig);
  if (!procedures) return "Ошибка #osdf84j";

  return (
    <>
      {/* <Create /> */}ZXzxc
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
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
