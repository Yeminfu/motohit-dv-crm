import ViewSQLResult from "#app/admin/sqlConsole/components/viewSQLResult/viewSQLResult.tsx";
import { Fragment } from "react";
import getDBTables from "../../utils/getDBTables";
import getContrains from "./utils/getContrains";

export default async function Contrains() {
  const contrains = await getContrains();
  const tables = await getDBTables();
  // const contrains
  return (
    <>
      {tables.map((tableObj) => (
        <Fragment>
          <div className="mb-4">
            <div className="card shadow">
              <div className="card-header">
                <strong> {tableObj.Tables_in_motohit_dv_crm}</strong>
              </div>
              <div className="card-body">
                {tableObj.Tables_in_motohit_dv_crm}
              </div>
            </div>
          </div>
        </Fragment>
      ))}

      <pre>{JSON.stringify(tables, null, 2)}</pre>
      <ViewSQLResult SQLResult={contrains.result} />
      {/* <pre>{JSON.stringify(contrains, null, 2)}</pre> */}
    </>
  );
}
