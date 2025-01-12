import ViewSQLResult from "#app/admin/sqlConsole/components/viewSQLResult/viewSQLResult.tsx";
import getContrains from "../../utils/getContrains";

export default async function ContrainsInTable(props: { tableName: string }) {
  const contrains = await getContrains(props.tableName);
  return (
    <>
      <ViewSQLResult SQLResult={contrains.result} />
    </>
  );
}
