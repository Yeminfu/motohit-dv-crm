import Create from "./components/create/create";
import DBSelectProcedures from "./utils/DBSelectProcedures";

export default async function Procedures() {
  const procedures = await DBSelectProcedures();
  return (
    <>
      <Create />
      <div>{JSON.stringify(procedures)}</div>
    </>
  );
}
