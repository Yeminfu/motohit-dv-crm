import getColumnsByTableName from "#app/admin/utils/getColumnsByTableName.ts";
import AuthedLayout from "#utils/authedLayout.tsx";
import DBSelectClass from "./utils/DBSelectClass";
import CreateNewField from "./components/createNewField/createNewField";
import RenderFields from "./components/renderFields/renderFields";
import Views from "./components/views/views";

export default async function Page(params: { params: { id: string } }) {
  const _class = await DBSelectClass(Number(params.params.id));

  if (!_class) return <>Ошибка #s9djakg</>;

  const columns = await getColumnsByTableName(_class.name);

  return (
    <AuthedLayout title={`Класс #${params.params.id} ${_class.name}`}>
      <>
        <div className="card">
          <div className="card-header">
            <strong>Колонки</strong>
          </div>
          <div className="card-body">
            <RenderFields className={_class.name} columns={columns} />
          </div>
        </div>
        <div className="card">
          <div className="card-header">Создать новую колонку</div>
          <div className="card-body">
            <CreateNewField className={_class.name} />
          </div>
        </div>

        <Views idClass={_class.id} />
      </>
    </AuthedLayout>
  );
}
