import AuthedLayout from "#utils/authedLayout.tsx";
import getDBKeys from "./getDBKeys";
import Classes from "./Classes";
import Keys from "./Keys";
import CreateClassButton from "./createClassButton";

export default async function Page() {
  const dbKeys = await getDBKeys();

  return (
    <>
      <AuthedLayout title="config">
        <>
          <CreateClassButton />
          <h3>Классы</h3>
          <Classes />
          {/*************************************************************** */}
          <h3>Ключи</h3>
          <Keys />
          <pre>{JSON.stringify(dbKeys, null, 2)}</pre>
        </>
      </AuthedLayout>
    </>
  );
}
