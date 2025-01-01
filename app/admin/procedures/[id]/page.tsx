import AuthedLayout from "#utils/authedLayout.tsx";
import EditProcedureForm from "./components/EditProcedureForm";
import getProcedure from "./utils/getProcedure";

export default async function Page(params: { params: { id: string } }) {
  const procedure = await getProcedure(params.params.id);

  if (!procedure) return "Ошибка #kasd93n";

  return (
    <>
      <AuthedLayout title={`Процедура ${procedure.Procedure}`}>
        <>
          {/* <pre>{JSON.stringify(procedure, null, 2)}</pre>
          <pre>{procedure["Create Procedure"]}</pre> */}
          <div className="card">
            <div className="card-header">Редактирование процедуры</div>
            <div className="card-body">
              <EditProcedureForm {...procedure} />
            </div>
          </div>
        </>
      </AuthedLayout>
    </>
  );
}
