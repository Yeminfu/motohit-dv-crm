import AuthedLayout from "#utils/authedLayout.tsx";
import Edit from "./components/edit";
import getKey from "./utils/getKey";

export default async function Page(a: { params: { name: string } }) {
  const keyFromDB = await getKey(a.params.name);
  return (
    <>
      <AuthedLayout title={`Ключ: ${a.params.name}`}>
        <div className="card">
          <div className="card-header">Редактирование процедуры</div>
          <div className="card-body">
            {keyFromDB ? <Edit {...keyFromDB} /> : <>err #kdf93j</>}
          </div>
        </div>
      </AuthedLayout>
    </>
  );
}
