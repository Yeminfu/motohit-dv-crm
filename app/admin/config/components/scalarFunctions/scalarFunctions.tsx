import dbWorker from "#db/dbWorker2.ts";
import Create from "./components/create/create";

export default async function ScalarFunctions() {
  const scalarFunctins = await getScalarSunctions();
  return (
    <>
      <Create />
      <pre>{JSON.stringify(scalarFunctins, null, 2)}</pre>
    </>
  );
}

async function getScalarSunctions() {
  const res = await dbWorker(
    `
    select * from chbfs_sys$scalarFunctions
  `,
    []
  );
  return res;
}
