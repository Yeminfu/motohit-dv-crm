import AuthedLayout from "#utils/authedLayout.tsx";
import getDBKeys from "./getDBKeys";
import Tables from "./Tables";
import Keys from "./Keys";
import CreateClassButton from "./createClassButton";

export default async function Page() {
  const dbKeys = await getDBKeys();

  return (
    <>
      <AuthedLayout title="config">
        <>
          <CreateClassButton />
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
