import AuthedLayout from "#utils/authedLayout.tsx";
import DBSelectClass from "./utils/DBSelectClass";

export default async function Page(params: { params: { id: string } }) {
  const _class = await DBSelectClass(Number(params.params.id));
  return (
    <AuthedLayout title={`Класс #${params.params.id}`}>
      <>
        <pre>{JSON.stringify({ _class }, null, 2)}</pre>
      </>
    </AuthedLayout>
  );
}
