import AuthedLayout from "#utils/authedLayout.tsx";
import getView from "./utils/getView";

export default async function Page(params: { params: { id: string } }) {
  const view = await getView(params.params.id);

  return (
    <>
      <AuthedLayout title="Представление (view)">
        <pre>{JSON.stringify(view, null, 2)}</pre>
      </AuthedLayout>
    </>
  );
}
