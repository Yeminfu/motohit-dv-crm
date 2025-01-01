import AuthedLayout from "#utils/authedLayout.tsx";
import getProcedure from "./utils/getProcedure";

export default async function Page(params: { params: { id: string } }) {
  const procedure = await getProcedure(params.params.id);

  if (!procedure) return "Ошибка #kasd93n";

  return (
    <>
      <AuthedLayout title={`Процедура ${procedure.Procedure}`}>
        <pre>{JSON.stringify(procedure, null, 2)}</pre>
      </AuthedLayout>
    </>
  );
}
