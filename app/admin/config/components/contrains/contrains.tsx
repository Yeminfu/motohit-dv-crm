import { Fragment } from "react";
import getDBTables from "../../utils/getDBTables";
import ContrainsInTable from "./components/contrainsInTable/contrainsInTable";

export default async function Contrains() {
  const tables = await getDBTables();
  return (
    <>
      {tables.map((tableObj) => (
        <Fragment key={tableObj.Tables_in_motohit_dv_crm}>
          <div className="mb-4">
            <div className="card shadow">
              <div className="card-header">
                Table: <strong> {tableObj.Tables_in_motohit_dv_crm}</strong>
              </div>
              <div className="card-body">
                <ContrainsInTable
                  tableName={tableObj.Tables_in_motohit_dv_crm}
                />
              </div>
            </div>
          </div>
        </Fragment>
      ))}
    </>
  );
}
