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
          <h3>Классы</h3>
          <Classes />
          <h3>Таблицы</h3>
          <Tables />
          {/*************************************************************** */}
          <h3>Ключи</h3>
          <Keys />
          <pre>{JSON.stringify(dbKeys, null, 2)}</pre>
        </>
      </AuthedLayout>
    </>
  );
}
