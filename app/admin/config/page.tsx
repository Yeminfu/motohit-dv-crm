import AuthedLayout from "#utils/authedLayout.tsx";
import getDBKeys from "./getDBKeys";
import Tables from "./Tables";
import Keys from "./Keys";
import Classes from "./components/Classes/Classes";

export default async function Page() {
  const dbKeys = await getDBKeys();

  return (
    <>
      <AuthedLayout title="config">
        <>
          <div className="card">
            <div className="card-header">
              <h3>Классы</h3>
            </div>
            <div className="card-body">
              <Classes />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Таблицы</h3>
            </div>
            <div className="card-body">
              <Tables />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Ключи</h3>
            </div>
            <div className="card-body">
              <Keys />
              <pre>{JSON.stringify(dbKeys, null, 2)}</pre>
            </div>
          </div>
        </>
      </AuthedLayout>
    </>
  );
}
