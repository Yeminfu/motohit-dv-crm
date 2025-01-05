import dbWorker from "#db/dbWorker2.ts";
import Link from "next/link";
import Create from "./components/create/create";
import ts_scalarFunction4create from "../../types/ts_scalarFunction4create";

export default async function ScalarFunctions() {
  const scalarFunctions = await getScalarSunctions();

  return (
    <>
      <Create />
      <table className="table table-bordered table-striped w-auto">
        <tbody>
          {scalarFunctions.map((scalarFunction) => (
            <tr
              key={scalarFunction.name}
              title={JSON.stringify(scalarFunction, null, 2)}
            >
              <td>
                <Link href={`/admin/scalarFunctions/${scalarFunction.name}`}>
                  {scalarFunction.name}
                </Link>
              </td>
              <td>{scalarFunction.title}</td>
              <td>{scalarFunction.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

async function getScalarSunctions(): Promise<ts_scalarFunction4create[]> {
  const res = await dbWorker(
    `
    select * from chbfs_sys$scalarFunctions
  `,
    []
  );
  if (res.error) {
    alert(
      JSON.stringify(
        {
          err: "#kadsa93",
          res,
        },
        null,
        2
      )
    );
    return [];
  }
  if (!res.result) {
    alert(
      JSON.stringify(
        {
          err: "#dks93",
          res,
        },
        null,
        2
      )
    );
    return [];
  }
  return res.result;
}
