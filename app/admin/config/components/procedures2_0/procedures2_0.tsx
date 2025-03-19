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
            <EditProcedureForm name={procedure.SPECIFIC_NAME} body={procedure.ROUTINE_DEFINITION} />
          </td>
        </tr>)}
      </tbody>
    </table>
  </>
}


