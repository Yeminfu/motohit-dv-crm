import AuthedLayout from "#utils/authedLayout.tsx";
import getScalarFunction from "./utils/getScalarFunction";
// import EditProcedureForm from "./components/EditProcedureForm";
// import getProcedure from "./utils/getProcedure";

export default async function Page(params: { params: { name: string } }) {
  const scalarFunction = await getScalarFunction(params.params.name);

  // if (!procedure) return "Ошибка #kasd93n";

  return (
    <>
      <AuthedLayout title={`Скалярная функция ${"procedure.name"}`}>
        <>
          {JSON.stringify(["scalarFunction", scalarFunction], null, 2)}
          <div className="card">
            <div className="card-header">Редактирование процедуры</div>
            <div className="card-body">
              {/* <EditProcedureForm {...procedure} /> */}
            </div>
          </div>
        </>
      </AuthedLayout>
    </>
  );
}
