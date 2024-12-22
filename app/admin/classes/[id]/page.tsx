import getColumnsByTableName from "#app/admin/utils/getColumnsByTableName.ts";
import AuthedLayout from "#utils/authedLayout.tsx";
import DBSelectClass from "./utils/DBSelectClass";

export default async function Page(params: { params: { id: string } }) {
  const _class = await DBSelectClass(Number(params.params.id));

  if (!_class) return <>Ошибка #s9djakg</>;

  const columns = await getColumnsByTableName(_class.className);

  return (
    <AuthedLayout title={`Класс #${params.params.id}`}>
      <>
        <pre>{JSON.stringify({ _class, columns }, null, 2)}</pre>
      </>
    </AuthedLayout>
  );
}
