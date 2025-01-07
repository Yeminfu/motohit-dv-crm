import AuthedLayout from "#utils/authedLayout.tsx";
import Edit from "./components/edit";
import ViewOutput from "./components/viewOutput/viewOutput";
import getView from "./utils/getView";

export default async function Page(params: { params: { id: string } }) {
  const view = await getView(params.params.id);

  return (
    <>
      <AuthedLayout title="Представление (view)">
        {(() => {
          if (!view) return <>err #kdsk3m</>;
          return (
            <>
              <Edit {...view} />
              <ViewOutput {...view} />
            </>
          );
        })()}
      </AuthedLayout>
    </>
  );
}
