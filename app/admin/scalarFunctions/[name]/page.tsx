import AuthedLayout from "#utils/authedLayout.tsx";
import EditScalarFunctionForm from "./components/EditScalarFunctionForm";
import getScalarFunction from "./utils/getScalarFunction";

export default async function Page(params: { params: { name: string } }) {
  const scalarFunction = await getScalarFunction(params.params.name);

  if (!scalarFunction) return "Ошибкаe #asdk39";

  return (
    <>
      <AuthedLayout title={`Скалярная функция ${scalarFunction.name}`}>
        <>
          <div className="card">
            <div className="card-header">Редактирование скалярки</div>
            <div className="card-body">
              <EditScalarFunctionForm {...scalarFunction} />
            </div>
          </div>
        </>
      </AuthedLayout>
    </>
  );
}
