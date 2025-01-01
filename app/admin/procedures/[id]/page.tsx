import AuthedLayout from "#utils/authedLayout.tsx";
import getProcedures from "./utils/getProcedures";

export default async function Page(params: { params: { id: string } }) {
  const procedure = await getProcedures(Number(params.params.id));

  if (!procedure) return "Ошибка #kasd93n";

  return (
    <>
      <AuthedLayout title={`Процедура ${procedure.name}`}>
        <pre>{JSON.stringify(procedure, null, 2)}</pre>
      </AuthedLayout>
    </>
  );
}
