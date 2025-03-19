import dbWorker from "@/db/dbWorker2";
import EditProcedureForm from "./components/editProcedureForm";
import getProcedures from "./utils/getProcedures";

export default async function Procedures2_0() {
  const procedures = await getProcedures();
  return <>
    <table className="table table-bordered w-auto">
      <tbody>
        {procedures.map(procedure => <tr key={procedure.SPECIFIC_NAME}>
          <th className="align-top">{procedure.SPECIFIC_NAME}</th>
          <td>
            <Procedure name={procedure.SPECIFIC_NAME} body={procedure.ROUTINE_DEFINITION} />
          </td>
        </tr>)}
      </tbody>
    </table>
  </>
}

async function Procedure(props: { name: string, body: string }) {
  const parameters = await getProcedureArguments(props.name);

  console.log(parameters.map(x => `${x.PARAMETER_MODE} ${x.PARAMETER_NAME} ${x.DATA_TYPE} ${x.CHARACTER_MAXIMUM_LENGTH || ''}`));


  const argumentsStr = parameters
    .map(x => `${x.PARAMETER_MODE} ${x.PARAMETER_NAME} ${x.DATA_TYPE} ${x.CHARACTER_MAXIMUM_LENGTH || ''}`)
    .join(",\n  ");

  const header = `create procedure ${props.name} (\n  ${argumentsStr}\n)`;
  return <>
    <EditProcedureForm name={props.name} body={props.body} header={header} />
  </>
}


async function getProcedureArguments(procedureName: string): Promise<{
  PARAMETER_MODE: "IN" | "OUT",
  PARAMETER_NAME: string,
  DATA_TYPE: string, CHARACTER_MAXIMUM_LENGTH?: number
}[]> {
  const sql = `
    SELECT
      PARAMETER_MODE,
      PARAMETER_NAME,
      DATA_TYPE
    FROM INFORMATION_SCHEMA.PARAMETERS 
    WHERE
      SPECIFIC_SCHEMA = 'motohit_dv_crm' 
      AND ROUTINE_TYPE = 'PROCEDURE'
      and SPECIFIC_NAME = ?
  `;
  const res = await dbWorker(sql, [procedureName]);
  return res.result;
}