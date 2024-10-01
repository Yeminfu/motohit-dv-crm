import Attributes from "@/types/attributes/attributes";
import AuthedLayout from "@/utils/authedLayout";
// import StartMigration from "../tools/devtools/migrate/startMigration";

export default function Home() {
  return (
    <main>
      <AuthedLayout title="Главная">
        <>
          {/* <StartMigration /> */}
          <Attributes />
        </>
      </AuthedLayout>
    </main>
  );
}
